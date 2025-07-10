export const fetchTodos = async () => {
  try {
    const res = await fetch("/api/todos");
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch todos error:", err);
    return [];
  }
};
export const addTodo = async (title, description = "") => {
  try {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return await res.json();
  } catch (err) {
    console.error("Add todo error:", err);
    return null;
  }
};

export const toggleTodo = async (id, completed) => {
  try {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  } catch (err) {
    console.error("Toggle todo error:", err);
  }
};

