import {TypeOf, z} from 'zod'


export const TDLtyeps = z.object({
    body: z.object({
        name: z.string({
            required_error: "name is required",
            invalid_type_error: "you must writ the userId"
        })
        ,
        email: z.string({
            required_error: "age  is required",
            invalid_type_error: "you must writ the bookID "
        })
        .email(),

        password: z.string({
            required_error: "major  is required",
            invalid_type_error: "you must writ the bookID "
        })
        .min(8, "the password must to be 8 charctar")
    })
})

export type createTDLtype = TypeOf<typeof TDLtyeps>["body"]