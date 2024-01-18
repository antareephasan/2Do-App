import TodoBox from "@/components/shared/todo-box";

const TodoList = ({
  todos,
  setUpdateTodoId,
  setLoading,
}: {
  todos: any;
  setUpdateTodoId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      {todos.map((todo: any) => (
        <TodoBox key={todo._id} todo={todo} setUpdateTodoId={setUpdateTodoId} setLoading={setLoading} />
      ))}
    </div>
  );
};

export default TodoList;
