import TodoBox from "@/components/shared/todo-box";

const TodoList = ({
  todos,
  updateTodoId,
  setUpdateTodoId,
  setLoading,
}: {
  todos: any;
  updateTodoId: string | undefined;
  setUpdateTodoId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      {todos.map((todo: any) => (
        <TodoBox key={todo._id} todo={todo} updateTodoId={updateTodoId} setUpdateTodoId={setUpdateTodoId} setLoading={setLoading} />
      ))}
    </div>
  );
};

export default TodoList;
