import { useState,useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import {
  ContainerOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";
import { useMoralis } from "react-moralis";
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css';
import Account from './components/Account/Account'
import Refferal from './components/Refferal/Refferal';


function App() {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Title } = Typography;
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  const [collapsed,setCollapsed] = useState(false);
  const onCollapse = collapse =>{
    setCollapsed(collapse)
  }
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Title style={{color:"white",textAlign: "center", paddingBlock: "10px"}} level={2}>KOMM</Title>

          <Menu style={{
            fontSize: "18px",
            fontWeight: "bold"
          }} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<AppstoreOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<ContainerOutlined />}>
              Address Book
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Deals">
              <Menu.Item key="3">IDO Deals</Menu.Item>
              <Menu.Item key="4">IKO Deals</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: "15px"}}>
            <div style={{
              display : "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <Title level={4} style={{color: "white"}}>Dashboard</Title>
              <>
                <Account/>
              </>
              
            </div>
          </Header>
          <Content style={{ margin: 'auto', width: "90%" }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {isAuthenticated && (
               <Refferal/> 
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Crypto Staking &amp; Launchpad - WEB3</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
