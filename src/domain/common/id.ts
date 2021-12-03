import * as t from 'io-ts'

import { validate as uuidValidate } from 'uuid'

interface IdBrand {
    readonly Id: unique symbol
}

export const IdBrand = t.brand(
    t.string,
    (str): str is t.Branded<string, IdBrand> => uuidValidate(str),
    'Id'
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* Id type, contains a phantom type <A> which represents to which type this Id belongs to */
export type Id = t.TypeOf<typeof IdBrand>
