"use client";

import Navbar from "@/components/shared/navbar";
import SpinnerOverlay from "@/components/shared/spinner-overlay";
import TodoInput from "@/components/shared/todo-input";
import TodoList from "@/components/shared/todo-list";
import { useState } from "react";

interface HomePageProps {
  userId: string | null;
  todos: any;
};

const HomePage = ({ userId, todos }: HomePageProps) => {
  const [updateTodoId, setUpdateTodoId] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Navbar />
      <TodoInput userId={userId} updateTodoId={updateTodoId} setUpdateTodoId={setUpdateTodoId} setLoading={setLoading} />
      <TodoList todos={todos} setUpdateTodoId={setUpdateTodoId} setLoading={setLoading} />
      <SpinnerOverlay loading={loading} />
    </>
  );
};

export default HomePage;
