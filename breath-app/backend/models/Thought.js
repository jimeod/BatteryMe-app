const mongoose = require('mongoose')

const thoughtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'El pensamiento no puede estar vacío'],
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Thought', thoughtSchema)
