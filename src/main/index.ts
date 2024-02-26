import 'npm:reflect-metadata'

import { log } from './log.ts'
import { worker } from './worker.ts'

worker.run().catch((err) => {
	log.error(err)
	Deno.exit(1)
})
