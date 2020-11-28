const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  fullLink: {
    type: String,
    required: [true, `Yêu cầu 'fullLink'!`]
  },
  shortLink: {
      type: String,
      required: [true,  `Yêu cầu 'shortLink'`],
  },
  QR: {
    type: Boolean,
    default: false
  },
  count: {
      type: Number,
      required: true,
      default: 0
  }
})

module.exports = schema
