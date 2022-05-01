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
  payee?: string
  payer?: string
}

export class Event {
  type: EventType
  amount: number
  account: string

  constructor (event: EventDTO) {
    this.amount = event.amount
    this.type = event.type
    this.account = event.account
  }
}
