import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  defaultUserPass: process.env.DEFAULT_USER_PASS,
}
