"use client";

import { Card } from "@/components/ui/card";
import { formSchema } from "@/schema/todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo, getTodoByTodoId, updateTodo } from "@/action/todo-actions";
import { toast } from "../ui/use-toast";
import { SetStateAction, useEffect, useState, useTransition } from "react";

interface TodoProps {
  userId: string | null;
  updateTodoId: string | undefined;
  setUpdateTodoId: React.Dispatch<SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoInput = ({ userId, updateTodoId, setUpdateTodoId, setLoading }: TodoProps) => {
  const [isPending, startTransition] = useTransition();
  const [editMode, setEditMode] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    task: "",
    isCompleted: false,
    todoId: "",
  });

  useEffect(() => {
    if (updateTodoId) {
      getTodoByTodoId(updateTodoId).then((data) =>
        setUpdatedTodo({
          task: data.task,
          isCompleted: data.isCompleted,
          todoId: data._id,
        })
      );
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [updateTodoId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      isCompleted: false
    },
  });

  // Update form values when updatedTodo changes
  useEffect(() => {
    form.setValue("task", updatedTodo.task);
    form.setValue("isCompleted", updatedTodo.isCompleted);
  }, [updatedTodo, form]);

  //Reset Function
  const reset = () => {
    setUpdateTodoId(""),
      setEditMode(false),
      setUpdatedTodo({
        task: "",
        isCompleted: false,
        todoId: "",
      });
  };

  // CREATE NEW TODO
  function submitCreateTodo(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const newTodo = await createTodo({
        todo: values,
        userId: userId,
      });

      if (newTodo.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No User Found!",
        });

        return;
      }

      toast({
        variant: "success",
        title: "Success",
        description: "Todo Created Successfully!",
      });

      reset();
    });
  }

  // UPDATE EXISTING TODO
  function submitUpdatedTodo(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const updateExistingTodo = await updateTodo({
        todoId: updatedTodo.todoId,
        todo: values,
        userId: userId,
      });

      if (updateExistingTodo.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No user found!",
        });

        return;
      }

      toast({
        variant: "success",
        title: "Success",
        description: "Todo Updated Successfully!",
      });
      reset();
    });
  }


  return (
    <Card className="mt-5 w-[350px] sm:w-[400px] lg:w-[600px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            updateTodoId ? submitUpdatedTodo : submitCreateTodo
          )}
          className="space-y-8"
        >
          <div className="p-5 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter your todo..."
                      {...field}
                      className="border-none text-xl p-0 focus-visible:ring-transparent focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              className="w-full p-2 text-lg bg-black hover:bg-slate-900"
              type="submit"
            >
              {editMode ? "Edit Your Todo" : "Add"}
            </Button>

            {editMode && (
              <Button
                onClick={reset}
                disabled={isPending}
                className="w-full p-2 text-lg bg-red-400 hover:bg-red-600 "
                type="submit"
              >
                Cancle
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default TodoInput;
