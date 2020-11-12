import { EventController } from './event/eventController'
import { SystemController } from './system/systemController'
import { TransactionController } from './transactions/transactionController'
import { TaskController } from './task/taskController'
import { SubtaskController } from './subtask/subtaskController'
import { FindingController } from './finding/findingController'
import { AnalystController } from './analyst/analystController'
import { FileController } from './file/fileController'

const eventController = new EventController()
const systemController = new SystemController()
const transactionController = new TransactionController()
const taskController = new TaskController()
const subtaskController = new SubtaskController()
const findingController = new FindingController()
const analystController = new AnalystController()
const fileController = new FileController()

export {
  eventController,
  systemController,
  transactionController,
  taskController,
  subtaskController,
  findingController,
  analystController,
  fileController
}
