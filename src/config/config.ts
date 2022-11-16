import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.URL || ""

const PORT = process.env.PORT || 8080

export const config = {
    mongo:{
        uri:MONGO_URL
    },
    port:{
        port:PORT
    }
}