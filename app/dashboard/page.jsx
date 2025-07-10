"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { fetchTodos, toggleTodo, deleteTodo } from "@/lib/todoHelpers";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const refresh = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    refresh();

    window.addEventListener("todosUpdated", refresh);
    return () => window.removeEventListener("todosUpdated", refresh);
  }, []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6">
  <SignedIn>
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Your Todos</h1>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Column 1: Pending — all todos stacked here */}
      <div className="rounded-2xl border border-border bg-muted/50 p-4 shadow-sm">
        <h2 className="text-xl font-semibold capitalize mb-4 text-zinc-700 dark:text-zinc-100">
          Pending
        </h2>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className="bg-background p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={async () => {
                      const success = await deleteTodo(todo.id);
                      if (success) {
                        window.dispatchEvent(new Event("todosUpdated"));
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Column 2: Ongoing */}
      <div className="rounded-2xl border border-border bg-muted/50 p-4 shadow-sm">
        <h2 className="text-xl font-semibold capitalize mb-4 text-zinc-700 dark:text-zinc-100">
          Ongoing
        </h2>
        <p className="text-muted-foreground text-sm">No tasks yet</p>
      </div>

      {/* Column 3: Completed */}
      <div className="rounded-2xl border border-border bg-muted/50 p-4 shadow-sm">
        <h2 className="text-xl font-semibold capitalize mb-4 text-zinc-700 dark:text-zinc-100">
          Completed
        </h2>
        <p className="text-muted-foreground text-sm">No tasks yet</p>
      </div>
    </div>
  </SignedIn>
</div>

  );
};

export default Dashboard;
