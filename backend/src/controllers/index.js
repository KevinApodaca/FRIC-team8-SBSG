import { EventController } from './event/eventController'
import { SystemController } from './system/systemController'
import { TransactionController } from './transactions/transactionController'
import { TaskController } from './task/taskController'
import { SubtaskController } from './subtask/subtaskController'
import { AnalystController } from './analyst/analystController'

const eventController = new EventController()
const systemController = new SystemController()
const transactionController = new TransactionController()
const taskController = new TaskController()
const subtaskController = new SubtaskController()
const analystController = new AnalystController()

export {
  eventController,
  systemController,
  transactionController,
  taskController,
  subtaskController,
  analystController
}
