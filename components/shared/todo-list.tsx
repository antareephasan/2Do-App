import TodoBox from "@/components/shared/todo-box";

const TodoList = ({ todos }: { 
    todos: any
}) => {
    return (
        <div>
            {
                todos.map((todo: any) => (
                    <TodoBox key={todo._id} todo={todo} />
                ))
            }
        </div>
    );
}

export default TodoList;