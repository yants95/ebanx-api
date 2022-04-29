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
