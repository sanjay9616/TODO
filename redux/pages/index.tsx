import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './todo/store';
import { addTodo, deleteTodo, updateTodo } from './todo/todoSlice';

export default function Home() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  const handleAddTodo = () => {
    if (taskName.trim()) {
      dispatch(addTodo(taskName));
      setTaskName('');
    }
  };

  const handleEditTodo = (id: number) => {
    if (editingTaskName.trim()) {
      dispatch(updateTodo({ id, name: editingTaskName }));
      setEditingTaskId(null);
      setEditingTaskName('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="container mx-auto mt-12 p-6 bg-gray-100 shadow rounded">
      <div className="flex mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 border border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">S.No.</th>
            <th className="border border-gray-300 px-4 py-2">Task</th>
            <th className="border border-gray-300 px-4 py-2">Created Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: any, index: number) => (
            <tr key={todo.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingTaskId === todo.id ? (
                  <input
                    type="text"
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  todo.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(todo.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  {editingTaskId === todo.id ? (
                    <button
                      onClick={() => handleEditTodo(todo.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTaskId(todo.id);
                        setEditingTaskName(todo.name);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
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
  );
}
