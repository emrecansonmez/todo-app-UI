import React from "react";
import { Row, Col, Form, Input, Button, theme } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { useToken } = theme;

export const Login: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/dashboard/taskManager");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ height: "98vh" }}>
      <Col
        span={12}
        style={{
          backgroundColor: "#111111",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: token.sizeLG,
        }}
      >
        <div
          style={{
            color: token.colorTextLightSolid,
            textAlign: "center",
            marginBottom: token.sizeLG,
          }}
        >
          <div>
            <img
              src={require("../../assets/todo.png")}
              alt="Organic Mind"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Col>

      <Col
        span={12}
        style={{
          padding: token.sizeMD,
          backgroundColor: token.colorFillContent,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h2
            style={{
              fontSize: token.fontSizeLG,
              marginBottom: token.sizeLG,
              textAlign: "center",
              color: token.colorTextHeading,
            }}
          >
            Sign in
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              style={{ marginBottom: token.sizeMD }}
            >
              <Input
                placeholder="email.email@mail.com"
                style={{
                  backgroundColor: token.colorFillAlter,
                  borderColor: token.colorBorder,
                  color: token.colorTextBase,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ marginBottom: token.sizeMD }}
            >
              <Input.Password
                placeholder="********"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{
                  backgroundColor: token.colorFillAlter,
                  borderColor: token.colorBorder,
                  color: token.colorTextBase,
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: token.colorPrimary,
                  borderColor: token.colorPrimary,
                  color: token.colorTextLightSolid,
                  marginBottom: token.sizeMD,
                }}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: token.sizeMD }}>
            <span style={{ color: token.colorTextBase }}>
              Don't have an account? <a href="/register">Sign up</a>
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};
