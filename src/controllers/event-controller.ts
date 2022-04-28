import { RequestError } from '@/errors'
import { EventService } from '@/services'
import { Request, Response } from 'express'

export class EventController {
  private readonly eventService: EventService

  constructor () {
    this.eventService = new EventService()
  }

  handle (req: Request, res: Response): void {
    try {
      const event = this.eventService.create(req.body)
      res.status(201).json(event)
    } catch (err) {
      if (err instanceof RequestError) {
        res.status(422).json({ message: err.message })
      }
    }
  }
}
