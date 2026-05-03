const mongoose = require('mongoose')

const checkinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      required: [true, 'El estado de ánimo es requerido'],
      enum: [
        'Feliz',
        'Tranquilo',
        'Ansioso',
        'Triste',
        'Enojado',
        'Cansado',
        'Motivado',
        'Asustado',
      ],
    },
    emoji: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Checkin', checkinSchema)
