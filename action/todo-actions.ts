"use server";

import { connectToDatabase } from "@/lib/database/db";
import Todo from "@/lib/database/models/todo.model";
import User from "@/lib/database/models/user.model";
import { CreateTodoParams } from "@/types";
import { revalidatePath } from "next/cache";

export const createTodo = async ({ todo, userId }: CreateTodoParams) => {
    try {
        await connectToDatabase();

        const existingUser = await User.findOne({
            clerkId: userId
        })

        if(!existingUser) {
            return { error: "No user found!" }
        }

        const newTodo = await Todo.create({
            ...todo,
            creator: existingUser.id
        })
        revalidatePath("/")
        return JSON.parse(JSON.stringify(newTodo));
       
    } catch(error) {
        console.log(error);
    }
}

export const getAllTodosByUserId = async (userId: string | null | undefined) => {
    try {
        await connectToDatabase();

        const existingUser = await User.findOne({
            clerkId: userId
        })

        if(!existingUser) return {  error: "No user found!" }

        const todos = await Todo.find({
            creator: existingUser.id,
        }).sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(todos));
        
    } catch (error) {
        console.log(error);
    }
}