import { EventDTO, EventType } from '@/entities'
import { EventRepository } from '@/repositories'
import { EventResponses } from '@/responses'

export type FilterOptions = {
  account_id: string
}

export class EventService {
  private readonly eventRepository: EventRepository

  constructor () {
    this.eventRepository = new EventRepository()
  }

  execute (data: EventDTO): any {
    if (data.type.toUpperCase() === EventType.DEPOSIT && data.destination) {
      const destination = this.eventRepository.findByAccountNumber(data.destination)
      if (destination) {
        this.eventRepository.increaseBalance(destination, data.amount)
        return EventResponses.generateResponse(data.type, null, destination)
      } else {
        const account = this.eventRepository.create(data)
        return EventResponses.generateResponse(data.type, null, account)
      }
    }
    if (data.type.toUpperCase() === EventType.WITHDRAW && data.origin) {
      const origin = this.eventRepository.findByAccountNumber(data.origin)
      if (!origin) throw new Error()
      this.eventRepository.decreaseBalance(origin, data.amount)
      return EventResponses.generateResponse(data.type, origin)
    }
    if ((data.type.toUpperCase() === EventType.TRANSFER) &&
        (data.origin && data.destination)) {
      const originAccount = this.eventRepository.findByAccountNumber(data.origin)
      const destinationAccount = this.eventRepository.findByAccountNumber(data.destination)
      if (originAccount && destinationAccount) {
        const originBalance = this.eventRepository.decreaseBalance(originAccount, data.amount)
        const destinationBalance = this.eventRepository.increaseBalance(destinationAccount, data.amount)
        return EventResponses.generateResponse(data.type, originBalance, destinationBalance)
      }
    }
  }

  balance (filters: FilterOptions): any {
    const account = this.eventRepository.findByAccountNumber(filters.account_id)
    if (!account) throw new Error()
    return this.eventRepository.getBalance(filters.account_id)
  }
}
