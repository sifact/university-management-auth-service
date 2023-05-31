import express, { Application } from 'express'
import userRouter from './app/modules/users/users.route'

import cors from 'cors'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes

app.use('api/v1/users/', userRouter)
export default app
