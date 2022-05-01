import { Event, EventType } from '@/entities'

export class EventResponses {
  static generateResponse (type: EventType, origin?: Event | null, destination?: Event | null): any {
    let response: any = {}
    switch (type.toUpperCase()) {
      case EventType.DEPOSIT:
        response = {
          destination: {
            id: destination?.account,
            balance: destination?.amount
          }
        }
        break
      case EventType.WITHDRAW:
        response = {
          origin: {
            id: origin?.account,
            balance: origin?.amount
          }
        }
        break
      case EventType.TRANSFER:
        response = {
          origin: {
            id: origin?.account,
            balance: origin?.amount
          },
          destination: {
            id: destination?.account,
            balance: destination?.amount
          }
        }
        break
      default:
        throw new Error('Invalid response.')
    }
    return response
  }
}
