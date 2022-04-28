import express, { Router, json } from 'express'

import { EventController } from '@/controllers'

export const app = express()
const router = Router()
const eventController = new EventController()

app.use(json())
router.post('/event', (req, res) => eventController.handle(req, res))
app.use(router)