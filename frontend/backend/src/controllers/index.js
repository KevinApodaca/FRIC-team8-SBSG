import { EventController } from './event/eventController'
import { SystemController } from './system/systemController'

const eventController = new EventController()
const systemController = new SystemController()

export {
  eventController,
  systemController
}
