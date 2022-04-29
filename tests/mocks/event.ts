import { EventType } from '@/entities'

export const mockDeposit = {
  type: EventType.DEPOSIT,
  account: '100',
  amount: 10
}

export const mockWithdraw = {
  type: EventType.WITHDRAW,
  account: '100',
  amount: 10
}

export const mockTransfer = {
  type: EventType.TRANSFER,
  origin: '100',
  amount: 15,
  destination: '300'
}
