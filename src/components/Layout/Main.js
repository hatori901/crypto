import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import MenuItems from "../MenuItems";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useNavigate();

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"left"}
        width={250}
        className={`drawer-sidebar`}
      >
        <Layout
          className={`layout-dashboard`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="dark"
            className={`sider-primary bg-blue-700 ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
          >
            <MenuItems/>
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          
        }}
        trigger={null}
        width={250}
        theme="dark"
        className={`sider-primary bg-blue-700  ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
      >
        <MenuItems/>
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""} bg-blue-700`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""} bg-blue-700`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
