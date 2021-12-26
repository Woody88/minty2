import { console, task } from 'fp-ts'
import { Trace } from '../../core/trace'

export const traceInterpreter: Trace<task.URI> = {
    trace: (str) => task.fromIO(console.log(str)),
}
