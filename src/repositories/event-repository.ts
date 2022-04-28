import { Event, EventDTO } from '@/entities'

export class EventRepository {
  events: Event[] = []

  create (data: EventDTO): Event {
    const event = new Event(data)
    this.events.push(event)
    return event
  }

  findByDestination (destination: string): Event | undefined {
    return this.events.find(event => event.destination === destination)
  }

  findByOrigin (origin: string): Event | undefined {
    return this.events.find(event => event.origin === origin)
  }

  increaseBalance (event: Event, amount: number): Event {
    event.amount += amount
    console.log('event')
    return event
  }
}
