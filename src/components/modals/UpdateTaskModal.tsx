import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { priorityOptions, stateOptions } from "../../constants/options";
const { TextArea } = Input;

interface UpdateTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    title: string;
    description: string;
    priority: number;
    state: number;
  }) => void;
  editingTask: {
    title: string;
    description: string;
    priority: number;
    state: number;
  } | null;
}

export const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingTask,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue(editingTask);
    }
  }, [editingTask, form]);

  return (
    <Modal title="Update Task" open={visible} onCancel={onCancel} footer={null}>
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
