import React, { useState } from "react";
import { TaskSearch } from "../../components/TaskSearch";
import { TaskTable } from "../../components/TaskTable";
import taskService from "../../services/task-service";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";
import { CreateTaskModal } from "../../components/modals/CreateTaskModal";
import { UpdateTaskModal } from "../../components/modals/UpdateTaskModal";
import { ViewTaskModal } from "../../components/modals/ViewTaskModal";
import useDebounce from "../../hooks/useDebounce";
import { Task } from "../../types";

export const TaskManager: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [direction, setDirection] = useState<string | undefined>();
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>();
  const [stateFilter, setStateFilter] = useState<string | undefined>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState<
    number | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const debouncedSearchText = useDebounce(searchText, 500);

  const { tasks, pagination, mutate } = taskService.useTasks({
    name: debouncedSearchText || undefined,
    priority: priorityFilter,
    state: stateFilter,
    sortBy,
    direction,
    pageable: { pageNumber: currentPage - 1, pageSize: 20 },
  });
  const showViewTaskModal = (task: Task) => {
    setViewingTask(task);
    setIsViewModalOpen(true);
  };
  const showUpdateTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsUpdateModalOpen(true);
  };
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    if (sorter.order) {
      setSortBy(sorter.field);
      setDirection(sorter.order === "ascend" ? "asc" : "desc");
    } else {
      setSortBy(undefined);
      setDirection(undefined);
    }

    const priorityFilter =
      filters.priority?.[0] !== "all" ? filters.priority?.[0] : undefined;
    const stateFilter =
      filters.state?.[0] !== "all" ? filters.state?.[0] : undefined;

    setPriorityFilter(priorityFilter);
    setStateFilter(stateFilter);
    setCurrentPage(pagination.current);
  };

  return (
    <>
      <TaskSearch
        searchText={searchText}
        onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        onAddTaskClick={() => setIsCreateModalOpen(true)}
      />

      <TaskTable
        tasks={tasks}
        pagination={pagination}
        onTableChange={handleTableChange}
        onView={showViewTaskModal}
        onEdit={showUpdateTaskModal}
        onDelete={(taskId) => {
          setSelectedTaskToDelete(taskId);
          setIsDeleteModalOpen(true);
        }}
      />

      <CreateTaskModal
        visible={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onSubmit={async (values) => {
          await taskService.createTask(values);
          mutate();
          setIsCreateModalOpen(false);
        }}
      />

      <UpdateTaskModal
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        onSubmit={async (values) => {
          if (editingTask) {
            await taskService.updateTask(editingTask.taskId, values);
            mutate();
            setIsUpdateModalOpen(false);
          }
        }}
        editingTask={editingTask}
      />

      <ConfirmDeleteModal
        visible={isDeleteModalOpen}
        onConfirm={async () => {
          if (selectedTaskToDelete) {
            await taskService.deleteTask(selectedTaskToDelete);
            mutate();
            setIsDeleteModalOpen(false);
          }
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <ViewTaskModal
        visible={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        viewingTask={viewingTask}
      />
    </>
  );
};
