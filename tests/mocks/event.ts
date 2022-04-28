import { EventType } from '@/entities'

export const mockAccountWithInitialBalance = {
  type: EventType.DEPOSIT,
  destination: '100',
  amount: 10
}
