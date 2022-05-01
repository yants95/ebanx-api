import { Event, EventDTO, EventType } from '@/entities'
import { randomUUID } from 'crypto'

const AMOUNT = 15
const ORIGIN_ACCOUNT = '100'
const DESTINATION_ACCOUNT = '300'

export const mockDeposit: EventDTO = {
  type: EventType.DEPOSIT,
  amount: AMOUNT,
  destination: ORIGIN_ACCOUNT
}

export const mockWithdraw: EventDTO = {
  type: EventType.WITHDRAW,
  origin: ORIGIN_ACCOUNT,
  amount: AMOUNT
}

export const mockTransfer: EventDTO = {
  type: EventType.TRANSFER,
  amount: AMOUNT,
  origin: ORIGIN_ACCOUNT,
  destination: DESTINATION_ACCOUNT
}

export const mockAccountOrigin: Event = {
  id: randomUUID(),
  account: ORIGIN_ACCOUNT,
  amount: AMOUNT
}

export const mockAccountDestination: Event = {
  id: randomUUID(),
  account: DESTINATION_ACCOUNT,
  amount: 0
}
