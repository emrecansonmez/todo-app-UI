import React from "react";
import { Table, Button, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Task } from "../types";

interface TaskTableProps {
  tasks: Task[];
  pagination: any;
  onTableChange: (pagination: any, filters: any, sorter: any) => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  pagination,
  onTableChange,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      render: (text: string) => text || "No Title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || "No Description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: number) => {
        const priorityMap = {
          4: "High",
          3: "Medium",
          2: "Low",
          1: "Very Low",
        } as const;

        const colorMap = {
          4: "red",
          3: "orange",
          2: "blue",
          1: "green",
        } as const;

        const displayPriority =
          priorityMap[priority as keyof typeof priorityMap] || "Unknown";
        const color = colorMap[priority as keyof typeof colorMap] || "black";

        return <span style={{ color }}>● {displayPriority}</span>;
      },
      filters: [
        { text: "All", value: "all" },
        { text: "High", value: 4 },
        { text: "Medium", value: 3 },
        { text: "Low", value: 2 },
        { text: "Very Low", value: 1 },
      ],
      filterMultiple: false,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state: number) => {
        if (state === 1) {
          return (
            <span style={{ color: "orange" }}>
              <SyncOutlined spin /> In Progress
            </span>
          );
        } else if (state === 2) {
          return (
            <span style={{ color: "green" }}>
              <CheckCircleOutlined /> Completed
            </span>
          );
        }
        return <span>Unknown</span>;
      },
      filters: [
        { text: "All", value: "all" },
        { text: "In Progress", value: "1" },
        { text: "Completed", value: "2" },
      ],
      filterMultiple: false,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Task) => (
        <Space>
          <Button
            type="text"
            icon={<SearchOutlined style={{ color: "#1890ff" }} />}
            onClick={() => onView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "#52c41a" }} />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
            onClick={() => onDelete(record.taskId)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="taskId"
      pagination={{
        current: pagination.pageNumber + 1,
        pageSize: pagination.pageSize,
        total: pagination.totalElements,
      }}
      onChange={onTableChange}
      bordered
      scroll={{ y: 520 }}
      style={{ minWidth: 400 }}
    />
  );
};
