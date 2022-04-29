import { EventDTO, EventType } from '@/entities'
import { RequestError } from '@/errors'
import { EventRepository } from '@/repositories'
import { EventResponses } from '@/responses'

export class EventService {
  private readonly eventRepository: EventRepository

  constructor () {
    this.eventRepository = new EventRepository()
  }

  execute (data: EventDTO): any {
    const event = this.eventRepository.findByAccountNumber(data.account)
    if (data.type.toUpperCase() === EventType.DEPOSIT) {
      if (event) {
        this.eventRepository.increaseBalance(event, data.amount)
        return EventResponses.generateResponse(event)
      } else {
        const eventCreated = this.eventRepository.create(data)
        return EventResponses.generateResponse(eventCreated)
      }
    }
    if (!event) throw new RequestError('Account does not exists.')
    if (data.type.toUpperCase() === EventType.WITHDRAW) {
      this.eventRepository.decreaseBalance(event, data.amount)
      return EventResponses.generateResponse(event)
    }
  }
}
