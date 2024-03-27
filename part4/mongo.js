const mongoose = require('mongoose')
const {MONGO_DB_URI} = require('./utils/config')

const connectionString = MONGO_DB_URI

mongoose.connect(connectionString)
    .then(() => console.log('connected with db'))
    .catch((error) => console.log(error))