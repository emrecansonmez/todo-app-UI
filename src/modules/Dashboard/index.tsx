import React, { useState } from "react";
import { Layout, Menu, Button, Grid, theme } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CheckSquareOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
const { useToken } = theme;
const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const pageTitles: { [key: string]: string } = {
    taskManager: "Task Manager",
    stickyWall: "Sticky Wall",
  };
  const pageTitle = pageTitles[currentPath || ""] || currentPath;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSignOut = () => {};

  return (
    <Layout style={{ backgroundColor: token.colorBgBase }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        breakpoint="md"
        collapsedWidth={70}
        width={250}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.sizeLG,
          margin: token.sizeSM,
          display: "flex",
          flexDirection: "column",
          height: "95vh",
          alignItems: "space-between",
        }}
      >
        <div
          style={{
            height: 64,
            background: token.colorFillAlter,
            margin: token.sizeMD,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: token.colorText,
            fontSize: token.fontSizeLG,
            fontWeight: "bold",
          }}
        >
          {!collapsed && <span>Menu</span>}

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "16px",
              color: token.colorText,
            }}
          />
        </div>

        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          style={{
            backgroundColor: token.colorFillAlter,
            color: token.colorTextBase,
          }}
          items={[
            {
              key: "1",
              icon: <CheckSquareOutlined />,
              label: <>Task Manager</>,
            },
            {
              key: "2",
              icon: <CheckSquareOutlined />,
              label: <>Sticky Wall</>,
            },
            {
              key: "3",
              icon: <LogoutOutlined />,
              label: <>Signout</>,
              style: {
                position: "absolute",
                bottom: 0,
                zIndex: 1,
                transition: "all 0.2s",
                textAlign: "center",
              },
              onClick: handleSignOut,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: token.colorBgBase,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: token.sizeMD,
            paddingRight: token.sizeMD,
          }}
        >
          <h1>{pageTitle}</h1>
        </Header>

        <Content
          style={{
            padding: token.sizeLG,
            backgroundColor: token.colorBgBase,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
