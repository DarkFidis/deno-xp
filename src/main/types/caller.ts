export interface Caller {
	file: string
	line: number | null
}

export type GetCaller = (baseDir: string, pos?: number) => Caller
