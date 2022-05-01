import { EventService, FilterOptions } from '@/services'

import { Request, Response } from 'express'

export class EventController {
  private readonly eventService: EventService

  constructor () {
    this.eventService = new EventService()
  }

  handle (req: Request, res: Response): void {
    try {
      const event = this.eventService.execute(req.body)
      res.status(201).json(event)
    } catch (err) {
      if (err instanceof Error) {
        res.status(404).json(0)
      }
    }
  }

  balance (req: Request, res: Response): void {
    try {
      const balance = this.eventService.balance(req.query as FilterOptions)
      res.status(200).json(balance)
    } catch (err) {
      if (err instanceof Error) {
        res.status(404).json(0)
      }
    }
  }

  reset (_: Request, res: Response): void {
    try {
      this.eventService.reset()
      res.sendStatus(200)
    } catch (err) {
      res.status(404).json(err)
    }
  }
}
