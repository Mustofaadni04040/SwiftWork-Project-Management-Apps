import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import api from "../configs/api";
import { deleteTask } from "../features/workspaceSlice";

export default function DeleteTaskDialog({
  isDialogOpen,
  setIsDialogOpen,
  selectedTasks,
  setSelectedTasks,
}) {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const token = await getToken();
      await api.post(
        "/api/tasks/delete",
        { taskIds: selectedTasks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.loading("Deleting tasks...");

      dispatch(deleteTask(selectedTasks));
      setSelectedTasks([]);
      toast.dismissAll();
      toast.success("Tasks deleted successfully");
    } catch (error) {
      console.log(error);
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/60 backdrop-blur">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg w-full max-w-md max-h-[600px] overflow-y-auto no-scrollbar p-6 text-zinc-900 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Delete Task</h2>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Are you sure you want to delete the selected tasks? This action cannot
          be undone.
        </p>

        <div className="flex items-center gap-3 justify-end">
          <button
            className="px-4 py-2 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-gradient-to-br from-red-500 to-red-600 text-white dark:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
