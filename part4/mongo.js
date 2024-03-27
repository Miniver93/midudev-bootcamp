const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
    .then(() => console.log('connected with db'))
    .catch((error) => console.log(error))