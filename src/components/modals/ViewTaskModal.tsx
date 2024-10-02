import React from "react";
import { Modal, Button, Typography, Descriptions } from "antd";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { priorityOptions } from "../../constants/options";

const { Text } = Typography;

interface ViewTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  viewingTask: {
    title: string;
    description: string;
    priority: number;
    state: number;
  } | null;
}

export const ViewTaskModal: React.FC<ViewTaskModalProps> = ({
  visible,
  onCancel,
  viewingTask,
}) => {
  const renderState = (state: number) => {
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
  };

  const getPriorityOption = (priority: number) => {
    return (
      priorityOptions.find((option) => option.value === priority) || {
        label: "Unknown",
        color: "gray",
      }
    );
  };

  return (
    <Modal
      title="View Task"
      open={visible}
      onCancel={onCancel}
      footer={null}
      styles={{ body: { paddingTop: "16px" } }}
    >
      {viewingTask && (
        <Descriptions column={1}>
          <Descriptions.Item label={<Text strong>Title:</Text>}>
            <Text>{viewingTask.title}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Description:</Text>}>
            <Text>{viewingTask.description}</Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Priority:</Text>}>
            <Text>
              <span
                style={{
                  color: getPriorityOption(viewingTask.priority).color,
                  marginRight: 8,
                }}
              >
                ●
              </span>
              {getPriorityOption(viewingTask.priority).label}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>State:</Text>}>
            <Text>{renderState(viewingTask.state)}</Text>
          </Descriptions.Item>
        </Descriptions>
      )}

      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button onClick={onCancel}>Close</Button>
      </div>
    </Modal>
  );
};
