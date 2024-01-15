"use client";

import {
    Card,
} from "@/components/ui/card"
import { formSchema } from "@/schema/todo-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs";
import { createTodo } from "@/action/todo-actions";
import { toast } from "../ui/use-toast";
import { useTransition } from "react";

const TodoInput = () => {
    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            isCompleted: false
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const newTodo = await createTodo({
                todo: values,
                userId: userId
            })

            if (newTodo.error) {
                toast({
                    variant: "destructive", 
                    title: "Error",
                    description: "No user found!",
                })
            }

            toast({ 
                variant: "success",
                title: "Success", 
                description: "Todo created successfully!" 
            })
        })
    }

    return (
        <Card className="mt-5 w-[350px] sm:w-[400px] lg:w-[600px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            className="w-full p-2 text-lg bg-black"
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>

    );
}

export default TodoInput;