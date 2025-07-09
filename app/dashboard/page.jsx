"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTodos = async ()=>{
        try {
            const res = await fetch("/api/todos")
            if(!res.ok) {
                const error = await res.json()
                console.error("GET error:", error);
                return;
            }
              const data = await res.json();
               if (!Array.isArray(data)) {
                console.error("Expected array, got:", data);
                return;
             }
               setTodos(data);
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }
     fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title || title.trim() === "") return;
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
    });
        setTodos((prev) => 
          prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        );
  };

  const handleDelete = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <div >
      <SignedIn>
        <div>
          <h1>Your Todos</h1>
          <UserButton />
        </div>

        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo"
          />
          <Button onClick={handleAddTodo}>Add</Button>
        </div>

        <ul>
            
            {todos.map((todo)=>(
                <li key={todo.id}
                 >
                    <span>{todo.title}</span>

                    <div>
                        <Button 
                            size ="sm"
                            variant="outline"
                            onClick={()=> toggleTodo(todo.id, !todo.completed)}
                        >
                            ✅

                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={()=> handleDelete(todo.id)}>
                        🗑️
                        </Button>
                    </div>
                 </li>   
            ))}
        </ul>
      </SignedIn>

      <SignedOut>
        <div>
            <h2>Sign in to use your todos</h2>
            <SignInButton>
                 <Button>Sign In</Button>
            </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
};

export default Dashboard;
