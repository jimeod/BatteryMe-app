const Checkin = require('../models/Checkin')
const User = require('../models/User')

// @desc    Create a new check-in
// @route   POST /api/checkins
// @access  Private
const createCheckin = async (req, res) => {
  try {
    const { mood, emoji, note } = req.body

    if (!mood || !emoji) {
      return res.status(400).json({ message: 'mood y emoji son requeridos' })
    }

    const checkin = await Checkin.create({
      user: req.user._id,
      mood,
      emoji,
      note: note || '',
    })

    // Mark activity 2 (check-in) as done on user
    const user = await User.findById(req.user._id)
    const act = user.activities.find((a) => a.id === 2)
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

    res.status(201).json({
      checkin: {
        id: checkin._id,
        mood: checkin.mood,
        emoji: checkin.emoji,
        note: checkin.note,
        date: checkin.createdAt,
      },
      battery: user.battery,
      activities: user.activities,
      streakDays: user.streakDays,
      currentStreak: user.currentStreak,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Get all check-ins for authenticated user
// @route   GET /api/checkins
// @access  Private
const getCheckins = async (req, res) => {
  try {
    const checkins = await Checkin.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50)

    const formatted = checkins.map((c) => ({
      id: c._id,
      mood: c.mood,
      emoji: c.emoji,
      note: c.note,
      date: c.createdAt.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
    }))

    res.json({ checkins: formatted })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

module.exports = { createCheckin, getCheckins }
