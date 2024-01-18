"use client";

import { changeTodoState, deleteTodo } from "@/action/todo-actions";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { any } from "zod";

interface TodoBoxProps {
  todo: any;
  updateTodoId: string | undefined;
  setUpdateTodoId: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoBox = ({
  todo,
  updateTodoId,
  setUpdateTodoId,
  setLoading
}: TodoBoxProps) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  //In here I have to update the todo value Immutably after its coming from Todo-actions.
  const toggleTodo = () => {
    // RESTRICT EDIT WHEN ALREADY EDITING NOTE: UNNECCESARY
    if(updateTodoId === todo._id) return;
    setLoading(true)
    changeTodoState(todo._id).then((data) => {
      setIsCompleted(data.isCompleted);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleDelete = () => {
    // RESTRICT DELETE WHEN EDITING
    if(updateTodoId === todo._id) return;
    setLoading(true)
    deleteTodo(todo._id).then((data) => {
      toast({
        title: "Deleted!",
        description: "Successfully deleted the task.",
        variant: "destructive"
      })
    }).finally(() => {
      setLoading(false);
    });
  };


  return (
    <Card className="mt-5 w-[350px] sm:w-[400px] lg:w-[600px]">
      <div className="flex justify-between items-center py-4 px-10 w-full">
        <div className="flex items-center w-full">
          <Image
            onClick={toggleTodo}
            alt="Circle Image"
            width={25}
            height={25}
            src={
              isCompleted
                ? "/assets/icons/CircleFill.svg"
                : "/assets/icons/Circle.svg"
            }
            className="cursor-pointer"
          />
          <CardHeader className="w-full">
            <CardTitle
              className={cn(
                "text-lg font-bold w-full text",
                isCompleted && "line-through"
              )}
            >
              {todo.task}
            </CardTitle>
          </CardHeader>
        </div>
        <div className="flex flex-col gap-5">
          <Image
            onClick={() => setUpdateTodoId(todo._id)}
            className="cursor-pointer"
            alt="Edit Icon"
            height={30}
            width={30}
            src="/assets/icons/Edit.svg"
          />
          <Image
            onClick={handleDelete}
            alt="Delete Icon"
            className="cursor-pointer"
            height={30}
            width={30}
            src="/assets/icons/Delete.svg"
          />
        </div>
      </div>
    </Card>
  );
};

export default TodoBox;
