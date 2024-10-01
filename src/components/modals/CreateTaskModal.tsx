import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { priorityOptions, stateOptions } from "../../constants/options";
const { TextArea } = Input;

interface CreateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    title: string;
    description: string;
    priority: number;
    state: number;
  }) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Create Task" open={visible} onCancel={onCancel} footer={null}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter the task title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the task description!" },
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
            {priorityOptions.map(
              (option: { value: number; label: string; color: string }) => (
                <Select.Option key={option.value} value={option.value}>
                  <span style={{ color: option.color }}>●</span> {option.label}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "Please select the task state!" }]}
        >
          <Select placeholder="Select state">
            {stateOptions.map((option: { value: number; label: string }) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
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
