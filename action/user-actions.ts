"use server";

import { connectToDatabase } from "@/lib/database/db";
import User from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error)
    }
}