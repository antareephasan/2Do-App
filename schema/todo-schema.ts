import * as z from 'zod'

export const formSchema = z.object({
    task: z.string().min(2, {
        message: "Todo must be at least 2 characters long!"
    }).max(600, {
        message: "Todo must be within 600 characters!"
    }),
    isCompleted: z.boolean().default(false)
})