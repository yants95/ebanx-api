import { EventRepository } from '@/repositories'
import { EventService, FilterOptions } from '@/services'
import { mockAccountDestination, mockAccountOrigin, mockDeposit, mockTransfer, mockWithdraw } from '@/tests/mocks'

describe('EventService', () => {
  let eventRepository: EventRepository
  let eventService: EventService

  beforeEach(() => {
    eventRepository = {} as EventRepository
    eventService = new EventService()
  })

  describe('DEPOSIT', () => {
    it('should be able to create a new account with initial balance', () => {
      eventRepository.findByAccountNumber = jest.fn()
      const depositResponse = eventService.execute(mockDeposit)

      expect(depositResponse.destination).toHaveProperty('id')
      expect(depositResponse.destination.balance).toEqual(15)
    })

    it('should be able to deposit into existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(true)
      eventService.execute(mockDeposit)

      const depositResponse = eventService.execute(mockDeposit)

      expect(depositResponse.destination).toHaveProperty('id')
      expect(depositResponse.destination.balance).toEqual(30)
    })
  })

  describe('WITHDRAW', () => {
    it('should be able to withdraw from a existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(true)
      eventService.execute(mockDeposit)

      const withdrawResponse = eventService.execute(mockWithdraw)

      expect(withdrawResponse.origin).toHaveProperty('id')
      expect(withdrawResponse.origin.balance).toEqual(0)
    })

    it('should not be able to withdraw from non-existing account', () => {
      eventRepository.findByAccountNumber = jest.fn()

      expect(() => eventService.execute(mockWithdraw)).toThrow()
    })
  })

  describe('TRANSFER', () => {
    it('should be able to transfer from a existing account', () => {
      eventService.execute(mockDeposit)
      eventService.execute({
        ...mockDeposit,
        amount: 0,
        destination: '300'
      })
      eventRepository.findByAccountNumber = jest.fn()
        .mockReturnValue(mockAccountOrigin)
        .mockReturnValueOnce(mockAccountDestination)

      const transferResponse = eventService.execute(mockTransfer)

      expect(transferResponse.origin).toHaveProperty('id')
      expect(transferResponse.origin.balance).toEqual(0)
      expect(transferResponse.destination).toHaveProperty('id')
      expect(transferResponse.destination.balance).toEqual(15)
    })

    it('should not be able make a transfer from non-existing account', () => {
      eventRepository.findByAccountNumber = jest.fn()

      expect(() => eventService.execute(mockTransfer)).toThrow()
    })
  })

  describe('BALANCE', () => {
    const filters: FilterOptions = {
      account_id: '100'
    }

    it('should not be able to get balance from non-existing account', () => {
      eventRepository.findByAccountNumber = jest.fn()

      expect(() => eventService.balance(filters)).toThrow()
    })

    it('should be able to get balance from a existing account', () => {
      eventRepository.findByAccountNumber = jest.fn().mockReturnValue(true)
      eventService.execute(mockDeposit)

      const balanceResponse = eventService.balance({
        account_id: '100'
      })

      expect(balanceResponse).toBe(15)
    })
  })

  describe('RESET', () => {
    it('should be able to reset events data', () => {
      const eventServiceSpy = jest.spyOn(eventService, 'reset')

      eventService.reset()

      expect(eventServiceSpy).toHaveBeenCalledTimes(1)
    })
  })
})
