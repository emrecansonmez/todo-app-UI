// TaskSearch.tsx
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

interface TaskSearchProps {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTaskClick: () => void;
}

export const TaskSearch: React.FC<TaskSearchProps> = ({
  searchText,
  onSearchChange,
  onAddTaskClick,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16,
    }}
  >
    <Input
      placeholder="Search tasks..."
      prefix={<SearchOutlined />}
      value={searchText}
      onChange={onSearchChange}
      style={{ width: "250px" }}
    />
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onAddTaskClick}
      style={{ marginLeft: "auto" }}
    >
      Add Task
    </Button>
  </div>
);
