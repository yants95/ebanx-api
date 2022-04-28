import { EventDTO, EventType } from '@/entities'
import { RequestError } from '@/errors'
import { EventRepository } from '@/repositories'
import { EventResponses } from '@/responses'

export class EventService {
  private readonly eventRepository: EventRepository

  constructor () {
    this.eventRepository = new EventRepository()
  }

  create (data: EventDTO): any {
    this.validateType(data)
    if (data.type.toUpperCase() === EventType.DEPOSIT && data.destination) {
      const existingEvent = this.eventRepository.findByDestination(data.destination)
      if (existingEvent) {
        this.eventRepository.increaseBalance(existingEvent, data.amount)
        return EventResponses.generateResponse(existingEvent)
      }
    }
    if (data.type.toUpperCase() === EventType.WITHDRAW && data.origin) {
      const existingEvent = this.eventRepository.findByOrigin(data.origin)
      if (existingEvent) {
        this.eventRepository.increaseBalance(existingEvent, data.amount)
        return EventResponses.generateResponse(existingEvent)
      }
    }
    const event = this.eventRepository.create(data)
    const response = EventResponses.generateResponse(event)
    return response
  }

  private validateType (data: any): void {
    const { type } = data
    const eventTypeKeys = Object.keys(EventType)
    if (!eventTypeKeys.includes(type.toUpperCase())) {
      throw new RequestError('The informed type is invalid.')
    }
  }
}
