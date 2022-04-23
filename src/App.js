import { useState,useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';

import "antd/dist/antd.css";
import { useMoralis } from "react-moralis";
import { Routes, Route,useNavigate } from "react-router-dom";
import './App.css';
import MenuItems from './components/MenuItems';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet/Wallet'
import Balance from './components/Wallet/Balance';
import Signup from './components/Account/Signup.js';
import Account from './components/Account/Account'


function App() {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Title } = Typography;
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  const [collapsed,setCollapsed] = useState(false);
  const location = useNavigate();
  const onCollapse = collapse =>{
    setCollapsed(collapse)
  }
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  useEffect(()=>{
    if(!isAuthenticated){
      return
    }
    if(!user.get("email")){
      location("/signup")
    }
  })
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Title style={{color:"white",textAlign: "center", paddingBlock: "10px"}} level={2}>KOMM</Title>
        <MenuItems/>
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
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb> */}
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/wallets' element={<Wallet/>}/>
              <Route path='/wallets/:address' element={<Balance/>}/>
              <Route path='/signup' element={<Signup/>}/>
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Crypto Staking &amp; Launchpad - WEB3</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
