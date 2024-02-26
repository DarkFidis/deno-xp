import { log } from './log.ts'
import { WebServer } from './services/web-server.ts'
import { WebServerable } from './types/web-server.ts'

const webServer: WebServerable = new WebServer(log)

export { webServer }
