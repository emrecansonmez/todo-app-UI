import React, { useState } from "react";
import { Row, Col, Form, Input, Button, theme, Grid } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";
const { useToken } = theme;
const { useBreakpoint } = Grid;

export const Login: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = (values: any) => {
    AuthService.login(values.email, values.password)
      .then(() => {
        navigate("/dashboard/taskManager");
      })
      .catch((error: any) => {
        console.error("Login error:", error);
        setErrorMessage("Invalid username or password");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Row style={{ height: "98vh" }}>
      {screens.md && (
        <Col
          md={12}
          style={{
            backgroundColor: "#252221",
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
            <img
              src={require("../../assets/thy-todo.webp")}
              alt="Organic Mind"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      )}

      <Col
        xs={24}
        md={12}
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
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              style={{ marginBottom: token.sizeMD }}
            >
              <Input
                placeholder="Enter your username"
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

            {errorMessage && (
              <Form.Item>
                <p style={{ color: "red" }}>{errorMessage}</p>
              </Form.Item>
            )}

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
