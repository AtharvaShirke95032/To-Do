"use client";

import { useEffect, useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { fetchTodos, deleteTodo, updateTodoStatus } from "@/lib/todoHelpers";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import Header from "@/components/Header";

const statuses = ["pending", "ongoing", "completed"];

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

useEffect(() => {
  const refresh = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  refresh(); // initial load

  // Listen for custom event
  const handleUpdate = () => refresh();
  window.addEventListener("todosUpdated", handleUpdate);

  // Clean up listener on unmount
  return () => {
    window.removeEventListener("todosUpdated", handleUpdate);
  };
}, []);

  const onDragEnd = (result) => {
  const { destination, source, draggableId } = result;

  if (!destination || destination.droppableId === source.droppableId) return;

  const newStatus = destination.droppableId;

  // ✅ Optimistically update UI first
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === draggableId ? { ...todo, status: newStatus } : todo
    )
  );

  // ⏳ Then update DB in background
  updateTodoStatus(draggableId, newStatus).catch((err) => {
    console.error("Failed to update status in DB:", err);
    // Optional: revert change if error
  });
};

  return (
    <div>

    <Header/>

    <div className="container mx-auto max-w-9xl px-4 py-6">
      
      <SignedIn>
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Your Todos</h1>
        
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-2xl border border-border bg-muted/50 p-4 shadow-sm min-h-[300px] flex flex-col"
                  >
                    <h2 className="text-xl font-semibold capitalize mb-4 text-zinc-700 dark:text-zinc-100">
                      {status}
                    </h2>

                    <ul className="space-y-4 flex-1">
                      {todos
                        .filter((todo) => todo.status === status)
                        .map((todo, index) => (
                          <Draggable draggableId={todo.id} index={index} key={todo.id}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
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
                                      onClick={async () => {
                                        const success = await deleteTodo(todo.id);
                                        if (success) {
                                          setTodos((prev) =>
                                            prev.filter((t) => t.id !== todo.id)
                                          );
                                        }
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </SignedIn>
    </div>
    </div>
  );
}
