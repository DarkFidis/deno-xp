import { log } from './log.ts'
import { worker } from './worker.ts'

worker.run().catch((err: any) => {
    log.error(err.message)
    Deno.exit(1)
})