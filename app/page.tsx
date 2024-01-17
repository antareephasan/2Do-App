import { getAllTodosByUserId } from "@/action/todo-actions";

import { auth } from "@clerk/nextjs";
import HomePage from "./home/Page";

export default async function Home() {
  const { userId } = auth();

  const todos = await getAllTodosByUserId(userId);
  // console.log(todos)

  // I have to make the update function here and pass it in TodoInput & Todolist Component

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <HomePage userId={userId} todos={todos} />
    </div>
  );
}
