import express, { Router, json } from 'express'

import { EventController } from '@/controllers'

export const app = express()
const router = Router()
const eventController = new EventController()

app.use(json())
router.post('/event', (req, res) => eventController.handle(req, res))
router.post('/reset', (req, res) => eventController.reset(req, res))
router.get('/balance', (req, res) => eventController.balance(req, res))
app.use(router)
