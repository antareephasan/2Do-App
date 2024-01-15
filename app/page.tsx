import { getAllTodosByUserId } from '@/action/todo-actions';
import Navbar from '@/components/shared/navbar'
import TodoInput from '@/components/shared/todo-input'
import TodoList from '@/components/shared/todo-list'
import { auth } from '@clerk/nextjs';

export default async function Home() {
  const { userId } = auth();


  const todos = await getAllTodosByUserId(userId);

  return (
    <div className='flex w-full flex-col justify-center items-center'>
      <Navbar />
      <TodoInput userId={userId} />
      <TodoList todos={todos} />
    </div>
  )
}