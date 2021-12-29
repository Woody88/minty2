import { console, task } from 'fp-ts'
import { Trace } from '../../core/trace'

export const traceInterpreter = (): Trace<task.URI> => {
    return {
        trace: (str) => task.fromIO(console.log(str)),
    }
}
