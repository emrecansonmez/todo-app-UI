import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, Select } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce"; // Debounce hook'u
import { CreateTaskModal } from "../../components/modals/CreateTaskModal";
import { UpdateTaskModal } from "../../components/modals/UpdateTaskModal";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";

interface Task {
  key: number;
  title: string;
  description: string;
  priority: string;
}

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<
    string | null
  >(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState<
    number | null
  >(null);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    setTasks([
      {
        key: 1,
        title: "Task 1",
        description: "Description for Task 1",
        priority: "High",
      },
      {
        key: 2,
        title: "Task 2",
        description: "Description for Task 2",
        priority: "Low",
      },
      {
        key: 3,
        title: "Task 3",
        description: "Description for Task 3",
        priority: "Medium",
      },
    ]);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) &&
      (selectedPriorityFilter && selectedPriorityFilter !== "all"
        ? task.priority === selectedPriorityFilter
        : true)
    );
  });

  const priorityOptions = [
    { value: "all", label: "All", color: "gray" },
    { value: "High", label: "High", color: "red" },
    { value: "Medium", label: "Medium", color: "orange" },
    { value: "Low", label: "Low", color: "blue" },
    { value: "Very Low", label: "Very Low", color: "green" },
  ];

  const showCreateTaskModal = () => setIsCreateModalOpen(true);
  const showUpdateTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleCancelCreateTaskModal = () => setIsCreateModalOpen(false);
  const handleCancelUpdateTaskModal = () => {
    setIsUpdateModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (key: number) => {
    setTasks(tasks.filter((task) => task.key !== key));
    setSelectedTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleAddTask = (values: {
    title: string;
    description: string;
    priority: string;
  }) => {
    const newTask: Task = {
      key: tasks.length + 1,
      title: values.title,
      description: values.description,
      priority: values.priority,
    };
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (values: {
    title: string;
    description: string;
    priority: string;
  }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === editingTask?.key ? { ...task, ...values } : task
      )
    );
    setIsUpdateModalOpen(false);
    setEditingTask(null);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Task, b: Task) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const option = priorityOptions.find((opt) => opt.value === priority);
        return (
          <span style={{ color: option?.color || "black" }}>● {priority}</span>
        );
      },
      filters: priorityOptions.map((opt) => ({
        text: opt.label,
        value: opt.value,
      })),
      onFilter: (value: any, record: Task) =>
        value === "all" ? true : record.priority === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Task) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showUpdateTaskModal(record)}
          >
            Update
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setSelectedTaskToDelete(record.key);
              setIsDeleteModalOpen(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search tasks..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Select
          placeholder="Filter by priority"
          allowClear
          onChange={(value) => setSelectedPriorityFilter(value)}
        >
          {priorityOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <span style={{ color: option.color }}>●</span> {option.label}
            </Select.Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateTaskModal}
        >
          Add Task
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        bordered
      />

      <CreateTaskModal
        visible={isCreateModalOpen}
        onCancel={handleCancelCreateTaskModal}
        onSubmit={handleAddTask}
      />

      <UpdateTaskModal
        visible={isUpdateModalOpen}
        onCancel={handleCancelUpdateTaskModal}
        onSubmit={handleUpdateTask}
        editingTask={editingTask}
      />

      <ConfirmDeleteModal
        visible={isDeleteModalOpen}
        onConfirm={() => handleDelete(selectedTaskToDelete!)}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
