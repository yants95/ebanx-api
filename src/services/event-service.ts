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
    const account = this.eventRepository.findByAccountNumber(data.account)
    if (data.type.toUpperCase() === EventType.DEPOSIT) {
      if (account) {
        this.eventRepository.increaseBalance(account, data.amount)
        return EventResponses.generateResponse(account)
      } else {
        const event = this.eventRepository.create(data)
        return EventResponses.generateResponse(event)
      }
    }
    if (!account) throw new Error()
    if (data.type.toUpperCase() === EventType.WITHDRAW) {
      this.eventRepository.decreaseBalance(account, data.amount)
      return EventResponses.generateResponse(account)
    }
    if (data.type.toUpperCase() === EventType.TRANSFER) {
      this.eventRepository.decreaseBalance(account, data.amount)
      this.eventRepository.increaseBalance(account, data.amount)
      return EventResponses.generateResponse(account)
    }
  }

  balance (filters: FilterOptions): any {
    const account = this.eventRepository.findByAccountNumber(filters.account_id)
    if (!account) throw new Error()
    return this.eventRepository.getBalance(filters.account_id)
  }
}
