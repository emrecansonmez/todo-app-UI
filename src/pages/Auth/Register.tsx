import React from "react";
import { Row, Col, Form, Input, Button, theme } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const { useToken } = theme;

export const Register: React.FC = () => {
  const { token } = useToken();

  const onFinish = (values: any) => {
    console.log("Success:", values);
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
            Sign up
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
              style={{ marginBottom: token.sizeMD }}
            >
              <Input
                placeholder="John Doe"
                style={{
                  backgroundColor: token.colorFillAlter,
                  borderColor: token.colorBorder,
                  color: token.colorTextBase,
                }}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
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
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: token.sizeMD }}>
            <span style={{ color: token.colorTextBase }}>
              Already have an account? <a href="/login">Sign in</a>
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};
