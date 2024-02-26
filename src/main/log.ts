import { Logger } from 'winston'

import { config } from './config.ts'
import { getLogger } from './utils/logger/index.ts'

const log: Logger = getLogger(config.log.name)

export { log }
