import { EventController } from './event/eventController'
import { SystemController } from './system/systemController'
import { TransactionController } from './transactions/transactionController'

const eventController = new EventController()
const systemController = new SystemController()
const transactionController = new TransactionController()

export {
  eventController,
  systemController,
  transactionController
}
