import { randomUUID } from 'crypto'

export enum EventType {
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT'
}

export type EventData = Event
export type EventDTO = Omit<Event, 'id'>

export class Event {
  id?: string
  type: EventType
  origin?: string
  amount: number
  destination?: string

  constructor (event: EventDTO) {
    if (!this.id) this.id = randomUUID()
    this.type = event.type
    this.origin = event.origin
    this.amount = event.amount
    this.destination = event.destination
  }
}
