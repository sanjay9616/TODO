import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useTaskContext } from "./context/TaskContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Home() {

  const { tasks, deleteTask, addTask, updateTask } = useTaskContext();
  const [taskName, setTaskName] = useState<string>("");

  const add = () => {
    if (!taskName.trim()) return;
    console.log("taskName", taskName)
    addTask(taskName)
    setTaskName("");
  };

  const deleteToDO = (id: number) => {
    deleteTask(id)

  }

  const editToDO = (id: number) => {
    const name = tasks.find((task: any) => task.id == id)?.name;
    const newName = prompt("Update Task", name) || "";
    updateTask(id, newName)
  }

  return (
    <>
      <div className="container mx-auto max-w-3xl mt-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="add-section flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Enter Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                add();
              }
            }}
            className="flex-1 px-4 py-2 text-base border border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={add}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            ADD
          </button>
        </div>

        <div className="table-section overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">S.No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Creation Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: any, i: number) => (
                <tr key={task?.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{task?.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{task?.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(task?.date).toLocaleDateString("en-GB")}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                      onClick={() => editToDO(task.id)}
                        className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => deleteToDO(task.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
