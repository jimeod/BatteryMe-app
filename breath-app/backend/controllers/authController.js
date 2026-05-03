const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe una cuenta con ese correo' })
    }

    const user = await User.create({ name, email, password })

    const token = generateToken(user._id)

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        battery: user.battery,
        streakDays: user.streakDays,
        currentStreak: user.currentStreak,
        activities: user.activities,
      },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ message: messages.join(', ') })
    }
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña requeridos' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Reset activities if it's a new day
    const lastReset = new Date(user.lastActivityReset)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (lastReset < today) {
      user.activities = user.activities.map((a) => ({ ...a, done: false, completedAt: null }))
      user.battery = 0
      user.lastActivityReset = today
      await user.save()
    }

    const token = generateToken(user._id)

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        battery: user.battery,
        streakDays: user.streakDays,
        currentStreak: user.currentStreak,
        activities: user.activities,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message })
  }
}

// @desc    Get current user (verify token)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        battery: req.user.battery,
        streakDays: req.user.streakDays,
        currentStreak: req.user.currentStreak,
        activities: req.user.activities,
      },
    })
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

module.exports = { register, login, getMe }
