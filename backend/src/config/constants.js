/**
 * Port of the Expresss server and Mongo host
 */
export const PORT = process.env.PORT || 3000
export const DATABSE_HOSTNAME = process.env.DATABASE_HOSTNAME || 'localhost'

/**
 * Configuration for MongoDB
 */
export const dbConfig = {
  url: `mongodb://${DATABSE_HOSTNAME}:27017/db`
}
