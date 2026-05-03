const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Correo inválido'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'Mínimo 6 caracteres'],
      select: false,
    },
    battery: {
      type: Number,
      default: 40,
      min: 0,
      max: 100,
    },
    streakDays: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false],
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    activities: {
      type: [
        {
          id: Number,
          done: { type: Boolean, default: false },
          completedAt: Date,
        },
      ],
      default: [
        { id: 1, done: false },
        { id: 2, done: false },
        { id: 3, done: false },
        { id: 4, done: false },
        { id: 5, done: false },
        { id: 6, done: false },
      ],
    },
    lastActivityReset: {
      type: Date,
      default: () => new Date().setHours(0, 0, 0, 0),
    },
  },
  { timestamps: true },
)

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare passwords
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password)
}

module.exports = mongoose.model('User', userSchema)
