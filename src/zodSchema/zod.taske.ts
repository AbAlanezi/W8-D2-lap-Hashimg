import {TypeOf, z} from 'zod'


export const taskeTyeps = z.object({
    body: z.object({
        
        title: z.string({
            required_error: "major  is required",
            invalid_type_error: "you must writ the bookID "
        })
    })
})

export type createTasketype = TypeOf<typeof taskeTyeps>["body"]