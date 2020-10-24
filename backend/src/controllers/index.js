import { EventController } from './event/eventController'
import { SystemController } from './system/systemController'
import { TransactionController } from './transactions/transactionController'
import { TaskController } from './task/taskController'
import { SubtaskController } from './subtask/subtaskController'

const eventController = new EventController()
const systemController = new SystemController()
const transactionController = new TransactionController()
const taskController = new TaskController()
const subtaskController = new SubtaskController()

export {
  eventController,
  systemController,
  transactionController,
  taskController,
  subtaskController
}
