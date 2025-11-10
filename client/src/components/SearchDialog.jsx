import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SearchDialog({ isDialogOpen, setIsDialogOpen }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen, setIsDialogOpen]);
  if (!isDialogOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/60 backdrop-blur">
      <div
        className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg w-full max-w-md max-h-[600px] overflow-y-auto no-scrollbar p-6 text-zinc-900 dark:text-white"
        ref={modalRef}
      >
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400 size-3.5" />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="pl-8 pr-4 py-2 w-full bg-white dark:bg-zinc-900 border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
