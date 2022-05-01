import { Event, EventData, EventType } from '@/entities'

export class EventResponses {
  static generateResponse (data: EventData & Event): any {
    const { type } = data
    let response: any = {}
    switch (type.toUpperCase()) {
      case EventType.DEPOSIT:
        response = {
          destination: {
            id: data.account,
            balance: data.amount
          }
        }
        break
      case EventType.WITHDRAW:
        response = {
          origin: {
            id: data.account,
            balance: data.amount
          }
        }
        break
      case EventType.TRANSFER:
        response = {
          origin: {
            id: data.account,
            balance: data.amount
          },
          destination: {
            id: data.account,
            balance: data.amount
          }
        }
        break
      default:
        throw new Error('Invalid response.')
    }
    return response
  }
}
