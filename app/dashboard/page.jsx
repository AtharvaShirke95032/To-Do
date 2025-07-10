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
  
  window.addEventListener('todosUpdated', refresh);
  return () => window.removeEventListener('todosUpdated', refresh);
}, []);

    
  return (
    <div >
      <SignedIn>
        <div className="container mx-auto flex justify-between items-center pt-4 pb-4">
          <h1 className="font-bold text-3xl">Your Todos</h1>
         
        </div>

        

        <ul>
            
            {todos.map((todo)=>(
                <li key={todo.id}
                 >
                    <span>{todo.title}</span>

                  
                 </li>   
            ))}
        </ul>
      </SignedIn>

      
    </div>
  );
};

export default Dashboard;
