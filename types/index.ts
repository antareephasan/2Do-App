export type CreateUserParams = {
    clerkId: string,
    username: string | null,
    email: string
}

export type CreateTodoParams = {
    todo: {
        task: string,
        isCompleted: boolean
    },
    userId: string | null | undefined
}