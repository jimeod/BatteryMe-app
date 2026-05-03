const User = require('../models/User')

// @desc    Get profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = req.user
    res.json({
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        battery: user.battery,
        streakDays: user.streakDays,
        currentStreak: user.currentStreak,
        activities: user.activities,
        createdAt: user.createdAt,
      },
    })
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

// @desc    Update profile (name)
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'El nombre es requerido' })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true },
    )

    res.json({
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Complete an activity (generic: ids 1,3,4,6)
// @route   POST /api/profile/activity/:activityId
// @access  Private
const completeActivity = async (req, res) => {
  try {
    const activityId = parseInt(req.params.activityId)
    const user = await User.findById(req.user._id)

    const act = user.activities.find((a) => a.id === activityId)
    if (!act) {
      return res.status(404).json({ message: 'Actividad no encontrada' })
    }

    if (act.done) {
      return res.json({
        message: 'Actividad ya completada',
        battery: user.battery,
        activities: user.activities,
        streakDays: user.streakDays,
        currentStreak: user.currentStreak,
      })
    }

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

module.exports = { getProfile, updateProfile, completeActivity }
