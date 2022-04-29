import { randomUUID } from 'crypto'

export enum EventType {
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT'
}

export type EventData = Event
export type EventDTO = {
  type: EventType
  amount: number
  account: string
  origin?: string
  destination?: string
}

export class Event {
  id?: string
  type: EventType
  amount: number
  account: string

  constructor (event: EventDTO) {
    if (!this.id) this.id = randomUUID()
    this.type = event.type
    this.amount = event.amount
    this.account = event.account
  }
}
