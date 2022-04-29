import { Event, EventDTO } from '@/entities'

export class EventRepository {
  events: Event[] = []

  create (data: EventDTO): Event {
    const event = new Event(data)
    this.events.push(event)
    return event
  }

  findByAccountNumber (accountNumber: string): Event | undefined {
    return this.events.find(event => event.account === accountNumber)
  }

  increaseBalance (event: Event, amount: number): Event {
    event.amount += amount
    return event
  }

  decreaseBalance (event: Event, amount: number): Event {
    event.amount -= amount
    return event
  }
}
