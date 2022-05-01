import { Event, EventDTO } from '@/entities'

export class EventRepository {
  events: Event[] = []

  create (data: EventDTO): Event {
    const event = new Event(data)
    this.events.push(event)
    return event
  }

  findByAccountNumber (accountNumber: string): Event | undefined {
    console.log('accountNumber', accountNumber)
    console.log('events array', this.events)
    return this.events.find(event => String(event.account) === String(accountNumber))
  }

  increaseBalance (event: Event, amount: number): Event {
    event.amount += amount
    return event
  }

  decreaseBalance (event: Event, amount: number): Event {
    event.amount -= amount
    return event
  }

  getBalance (account_id: string): number | undefined {
    const account = this.events.find(event => event.account === account_id)
    return account?.amount
  }
}
