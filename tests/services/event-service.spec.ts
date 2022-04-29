import { RequestError } from '@/errors'
import { EventRepository } from '@/repositories'
import { EventService } from '@/services'
import { mockDeposit, mockWithdraw } from '@/tests/mocks'

describe('EventService', () => {
  let eventRepository: EventRepository
  let eventService: EventService

  beforeEach(() => {
    eventRepository = {} as EventRepository
    eventService = new EventService()
  })

  describe('DEPOSIT', () => {
    it('should be able to create a new account with initial balance', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(undefined)
      const depositResponse = eventService.execute(mockDeposit)

      expect(depositResponse.destination).toHaveProperty('id')
      expect(depositResponse.destination.balance).toEqual(10)
    })

    it('should be able to deposit into existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(true)
      eventService.execute(mockDeposit)

      const depositResponse = eventService.execute(mockDeposit)

      expect(depositResponse.destination).toHaveProperty('id')
      expect(depositResponse.destination.balance).toEqual(20)
    })
  })

  describe('WITHDRAW', () => {
    it('should be able to withdraw from a existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(true)
      eventService.execute(mockDeposit)

      const withdrawResponse = eventService.execute(mockWithdraw)

      expect(withdrawResponse.destination).toHaveProperty('id')
      expect(withdrawResponse.destination.balance).toEqual(0)
    })

    it('should not be able to withdraw from a non-existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockRejectedValueOnce(undefined)
      const error = new RequestError('Account does not exists.')

      expect(() => eventService.execute(mockWithdraw)).toThrow(error.message)
    })
  })
})
