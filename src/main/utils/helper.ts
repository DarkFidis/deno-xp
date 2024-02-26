import { Callback, Helperable } from '../types/helper.ts'
import { Mapable } from '../types/basic-types.ts'

export const asCallback: Helperable['asCallback'] = (promise, cb) => {
	promise.then(
		(value) => {
			cb(null, value)
		},
		(err) => {
			cb(err, undefined)
		},
	)
}
export const charToHexa = (s: string): string =>
	`000${s.charCodeAt(0).toString(16)}`.slice(-4)
export const eachAsync: Helperable['eachAsync'] = async (array, iterator) =>
	await array.reduce<Promise<void>>(
		(p, item, index, ar) =>
			p.then(async () => {
				await iterator(item, index, ar)
			}),
		Promise.resolve(),
	)
export const expireAtToTtl = (expireAt: number): number =>
	expireAt - Math.floor(Date.now() / 1000)
export const fromCallback = async <T>(
	fn: (cb: Callback<T>) => void,
): Promise<T> =>
	new Promise((resolve, reject) => {
		fn((err, value) => {
			if (err) {
				reject(err)
			} else {
				resolve(value)
			}
		})
	})
export const mapAsync: Helperable['mapAsync'] = (array, iterator) =>
	Promise.all(array.map(iterator))
export const repeat: Helperable['repeat'] = (count, iterator: (index: number) => void) => {
	Array.from(Array(count)).forEach((__, index) => {
		iterator(index)
	})
}
export const stringHash: Helperable['stringHash'] = (o) => {
	const s: string = typeof o === 'object' ? JSON.stringify(o) : `${o}`
	let hash = 5381
	let i = s.length
	while (i) {
		hash = (hash * 33) ^ s.charCodeAt(--i)
	}
	const unsignedHash = hash >>> 0
	return String(unsignedHash)
}
export const validTtlToExpireAt = (ttl: number): number =>
	Math.floor(Date.now() / 1000) + ttl
