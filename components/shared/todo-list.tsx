import TodoBox from "@/components/shared/todo-box";

const TodoList = ({
  todos,
  setUpdateTodoId,
}: {
  todos: any;
  setUpdateTodoId: any;
}) => {
  return (
    <div>
      {todos.map((todo: any) => (
        <TodoBox key={todo._id} todo={todo} setUpdateTodoId={setUpdateTodoId} />
      ))}
    </div>
  );
};

export default TodoList;
