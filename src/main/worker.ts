import Signal = Deno.Signal;

import { log } from './log.ts'
import { webServer } from './server.ts'
import { Workerable } from './types/worker.ts'

export const worker: Workerable = {
	handleSignal: async (name) => {
		log.info(`received ${name} signal : stopping`)
		await worker.shutdown()
	},
	run: async () => {
		const signals: Signal[] = ['SIGINT', 'SIGTERM']
		signals.forEach((signal) => {
			Deno.addSignalListener(signal, () => {
				void worker.handleSignal(signal)
			})
		})
		webServer.init()
		await webServer.start()
		log.info(`/!\\ to stop worker : kill -s SIGTERM ${Deno.pid}`)
	},
	shutdown: async (exitCode = 1) => {
		try {
			await webServer.stop()
			Deno.exit(exitCode)
		} catch (err) {
			log.error(err)
			Deno.exit(1)
		}
	},
}
