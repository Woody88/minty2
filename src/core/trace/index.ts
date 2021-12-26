import { Kind, URIS } from 'fp-ts/HKT'

export interface Trace<F extends URIS> {
    trace: (str: string) => Kind<F, void>
}
