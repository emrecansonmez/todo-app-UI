import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const { TextArea } = Input;

interface CreateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    title: string;
    description: string;
    priority: string;
  }) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const priorityOptions = [
    { value: "High", label: "High", color: "red" },
    { value: "Medium", label: "Medium", color: "orange" },
    { value: "Low", label: "Low", color: "blue" },
    { value: "Very Low", label: "Very Low", color: "green" },
  ];

  return (
    <Modal title="Create Task" open={visible} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the task title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the task description!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[
            { required: true, message: "Please select the task priority!" },
          ]}
        >
          <Select placeholder="Select priority">
            {priorityOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                <span style={{ color: option.color }}>●</span> {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
