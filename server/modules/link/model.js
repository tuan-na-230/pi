const mongoose = require('mongoose')

const schema = require('./schema')
const MODEL_NAME = 'link'
const COLLECTION_NAME = 'link'

const model = mongoose.model(
  MODEL_NAME,
  schema,
  COLLECTION_NAME
)

module.exports = model