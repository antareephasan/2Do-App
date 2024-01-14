import Navbar from '@/components/shared/navbar'
import TodoInput from '@/components/shared/todo-input'
import TodoList from '@/components/shared/todo-list'

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Navbar />
      <TodoInput />
      <TodoList />
    </div>
  )
}