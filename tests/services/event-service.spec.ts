import { EventRepository } from '@/repositories'
import { EventService } from '@/services'
import { mockAccountWithInitialBalance } from '@/tests/mocks'

describe('EventService', () => {
  const eventRepository = {} as EventRepository
  const eventService = new EventService()
  it('should be able to create a new account with initial balance', () => {
    const response = eventService.create(mockAccountWithInitialBalance)

    expect(response.destination).toHaveProperty('id')
  })

  it('should be able to deposit into existing account', () => {
    eventRepository.findByDestination = jest.fn().mockReturnValue(true)
    eventService.create(mockAccountWithInitialBalance)

    const response = eventService.create(mockAccountWithInitialBalance)

    expect(response.destination).toHaveProperty('id')
    expect(response.destination.balance).toEqual(20)
  })
})
