"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function FormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();
  const params = useParams();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement, HTMLTextAreaElement>
  ) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const handleCancel = () => {
    setNewTask({
      title: "",
      description: "",
    });
    router.push("/");
    router.refresh();
  };

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description,
    });
  };

  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = res.json();
      if(res.status === 200) {
        router.push("/");
        router.refresh();
      }
    } catch(error) {
      console.error(error)
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });
      router.push("/");
      router.refresh();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!params.id) {
      createTask();
    } else {
      updateTask()
    }
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl text-white">
            {!params.id ? "Create Task" : "Edit Task"}
          </h1>

          <button
            type="button"
            className="bg-red-500 px-3 py-1 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </header>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={newTask.title}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4 text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          onChange={handleChange}
          value={newTask.description}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
        >
          {!params.id ? "Save" : "Update"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default FormPage;
