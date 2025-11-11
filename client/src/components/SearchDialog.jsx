import { ChevronRight, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchDialog({ isDialogOpen, setIsDialogOpen }) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const projects = useSelector(
    (state) => state?.workspace?.currentWorkspace?.projects || []
  );

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }

    return () => {
      setFilteredProjects(projects);
    };
  }, [searchTerm, projects]);

  useEffect(() => {
    if (isDialogOpen) {
      inputRef.current.focus();
    }
  }, [isDialogOpen]);

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
        className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg min-w-sm max-w-md lg:min-w-2xl max-h-[600px] text-zinc-900 dark:text-white"
        ref={modalRef}
      >
        {/* Search Input */}
        <div className="w-full border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 py-3 px-4">
            <SearchIcon className="text-gray-400 dark:text-zinc-400 size-3.5" />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search your projects..."
              className="py-2 w-full bg-white dark:bg-zinc-900 border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none"
              ref={inputRef}
            />
          </div>
        </div>

        <div className="mt-4 px-4 py-3 w-full border border-gray-200 dark:border-zinc-800">
          <p className="text-lg font-bold">Results: </p>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[300px]">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link
                to={`/projectsDetail?id=${project.id}&tab=tasks`}
                key={project.id}
                className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-b border-gray-200 dark:border-zinc-800"
                onClick={() => setIsDialogOpen(false)}
              >
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-zinc-200 mb-1 truncate">
                    {project.name}
                  </h3>
                  <ChevronRight className="text-gray-400 dark:text-zinc-400 size-3.5" />
                </div>
              </Link>
            ))
          ) : projects.length > 0 ? (
            <div className="py-3 px-4">
              <p className="text-gray-500 dark:text-zinc-400 text-sm">
                No projects found for "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="py-3 px-4">
              <p className="text-gray-500 dark:text-zinc-400 text-sm">
                You don&apos;t have any projects
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
