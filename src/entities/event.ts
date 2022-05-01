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
  origin?: string
  destination?: string
}

export class Event {
  id: string
  amount: number
  account: string

  constructor (event: EventDTO) {
    this.id = randomUUID()
    this.amount = event.amount
    this.account = event.origin ?? event.destination ?? '0'
  }
}
