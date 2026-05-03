const Thought = require('../models/Thought')
const User = require('../models/User')

// @desc    Create a new thought
// @route   POST /api/thoughts
// @access  Private
const createThought = async (req, res) => {
  try {
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'El pensamiento no puede estar vacío' })
    }

    const thought = await Thought.create({
      user: req.user._id,
      text: text.trim(),
    })

    res.status(201).json({
      thought: {
        id: thought._id,
        text: thought.text,
        date: thought.createdAt.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Get all thoughts for authenticated user
// @route   GET /api/thoughts
// @access  Private
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(100)

    const formatted = thoughts.map((t) => ({
      id: t._id,
      text: t.text,
      date: t.createdAt.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    }))

    res.json({ thoughts: formatted })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Delete a thought
// @route   DELETE /api/thoughts/:id
// @access  Private
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)

    if (!thought) {
      return res.status(404).json({ message: 'Pensamiento no encontrado' })
    }

    if (thought.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado' })
    }

    await thought.deleteOne()

    res.json({ message: 'Pensamiento eliminado', id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Complete activity 5 (thoughts) on user
// @route   POST /api/thoughts/complete
// @access  Private
const completeThoughtActivity = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const act = user.activities.find((a) => a.id === 5)
    if (act && !act.done) {
      act.done = true
      act.completedAt = new Date()
      user.battery = Math.min(user.battery + 10, 100)
      if (user.activities.every((a) => a.done)) {
        const dayIdx = new Date().getDay()
        const idx = dayIdx === 0 ? 6 : dayIdx - 1
        user.streakDays[idx] = true
        user.currentStreak += 1
      }
      await user.save()
    }

    res.json({
      battery: user.battery,
      activities: user.activities,
      streakDays: user.streakDays,
      currentStreak: user.currentStreak,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

module.exports = { createThought, getThoughts, deleteThought, completeThoughtActivity }
