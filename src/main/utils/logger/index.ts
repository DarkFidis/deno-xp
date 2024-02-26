import {
	createLogger,
	format,
	LoggerOptions,
	transports,
	config as winstonConfig,
} from 'winston'

import { config } from '../../config.ts'
import { GetLogger } from '../../types/logger.ts'
import { transformers } from './transformers.ts'

const env = Deno.env.get('NODE_CONFIG_ENV') || Deno.env.get('NODE_ENV') ||
	'development'
const isJSONLogEnabled = Deno.env.get('JSON_LOG')
export const getLogger: GetLogger = (appName: string) => {
	const baseFormat = format.combine(
		format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZZ' }),
		format.splat(),
	)

	const defaultFormat = format.combine(
		baseFormat,
		transformers.keyToUpperCase('level')(),
		format.label({ label: appName }),
		format.colorize({ level: true }),
		format.printf(
			(info) =>
				`[${info.timestamp}] [${info.level}] [${info.label}] - ${info.message}`,
		),
	)
	const jsonFormat = format.combine(
		baseFormat,
		transformers.addCustomKeys(appName)(),
		transformers.removeKeys(['timestamp', 'level', 'message'])(),
		format.json(),
	)

	const loggerOptions: LoggerOptions = {
		format: isJSONLogEnabled ? jsonFormat : defaultFormat,
		level: config.log.level,
		levels: winstonConfig.syslog.levels,
	}

	switch (env) {
		case 'production':
		case 'preprod':
			loggerOptions.transports = [
				new transports.Console({
					stderrLevels: ['error', 'fatal', 'warn'],
				}),
			]
			break
		default:
			loggerOptions.transports = [new transports.Console()]
			break
	}

	return createLogger(loggerOptions)
}
