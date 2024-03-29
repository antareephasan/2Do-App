"use server";

import { connectToDatabase } from "@/lib/database/db";
import Todo from "@/lib/database/models/todo.model";
import User from "@/lib/database/models/user.model";
import { CreateTodoParams, UpdateTodoParams } from "@/types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createTodo = async ({ todo, userId }: CreateTodoParams) => {
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) {
      return { error: "No user found!" };
    }

    const newTodo = await Todo.create({
      ...todo,
      creator: existingUser.id,
    });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodosByUserId = async (
  userId: string | null | undefined
) => {
  await connectToDatabase();

  try {
    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) return { error: "No user found!" };

    const todos = await Todo.find({
      creator: existingUser.id,
    }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.log(error);
  }
};

// TOGGLE TO COMPLETE/INCOMPLETE TODO
export const changeTodoState = async (id: string) => {
  try {
    await connectToDatabase();

    const { userId } = auth();

    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) return { error: "No User found" };
    const existingTodo = await Todo.findById(id);

    if (!existingTodo) return { error: "No Todo found!" };
    
    const toggleTodoCheckMark = await Todo.findByIdAndUpdate(
      existingTodo._id,
      { isCompleted: !existingTodo.isCompleted },
      { new: true }
    );

    if (!toggleTodoCheckMark) {
      console.log("Failed to update Todo-CheckMark");
    }

    return JSON.parse(JSON.stringify(toggleTodoCheckMark));
  } catch (error) {
    console.log(error);
  }
};

// GET TODO BY TODO ID
export const getTodoByTodoId = async (id: string) => {
  try {
    await connectToDatabase();

    const { userId } = auth();

    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) return { error: "No User found" };
    const existingTodo = await Todo.findById(id);

    if (!existingTodo) return { error: "No Todo found!" };

    return JSON.parse(JSON.stringify(existingTodo));
  } catch (error) {
    console.log(error);
  }
};

// UPDATE || EDIT TODO
export const updateTodo = async ({ todo, userId, todoId }: UpdateTodoParams) => {
  try {
    await connectToDatabase();
    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) {
      return { error: "No user found!" };
    }

    const updateTodo = await Todo.findByIdAndUpdate(todoId, {
      ...todo,
    });

    revalidatePath("/");
    return JSON.parse(JSON.stringify(updateTodo));
  } catch (error) {
    console.log(error);
  }
};

// DELETE TODO
export const deleteTodo = async (id: string) => {
  try {
    await connectToDatabase();

    const { userId } = auth();

    const existingUser = await User.findOne({
      clerkId: userId,
    });

    if (!existingUser) return { error: "No User found" };

    const existingTodo = await Todo.findById(id);

    if (!existingTodo) return { error: "No Todo found!" };

    // Confirming that the user is the one created this todo
    if(existingUser._id.toHexString() !== existingTodo.creator.toHexString()) return { error: 'You are not authorized to perform this action!'}

    await Todo.findByIdAndDelete(existingTodo._id);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
