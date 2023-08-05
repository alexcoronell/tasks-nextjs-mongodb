import { connectDB } from "@/utils/monsoose";
import Task from "@/models/Task";
import TaskCard from "../components/TaskCard";

async function loadTasks() {
  connectDB()
  return await Task.find()
}

async function HomePage() {
  const tasks = await loadTasks()
  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map(task => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  )
}

export default HomePage;