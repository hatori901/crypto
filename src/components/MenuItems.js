import { useLocation,NavLink } from "react-router-dom";
import {Menu} from "antd"
import { useMoralis } from "react-moralis";
import {
    ContainerOutlined,
    AppstoreOutlined,
    UserOutlined,
    UsergroupAddOutlined
  } from '@ant-design/icons';

function MenuItems(){
    const { SubMenu } = Menu;
    const {pathname} = useLocation()
    const {isAuthenticated} = useMoralis();
    return (
        <>
        <div style={{fontSize: "30px",fontWeight: "bold"}}>
          <span>Kommunitas</span>
        </div>
        <hr/>
          <Menu style={{
            fontSize: "18px",
            fontWeight: "bold"
          }} theme="light" defaultSelectedKeys={[pathname]} mode="inline">
            <Menu.Item key="/">
                <NavLink to="/">
                <span
                  className="icon"
                >
                  <AppstoreOutlined />
                </span>
                <span className="label">Dashboard</span>
                </NavLink>
            </Menu.Item>
            {isAuthenticated && (
              <>
              <Menu.Item key="wallets">
                <NavLink to="/wallets">
                  <span
                    className="icon"
                  >
                    <ContainerOutlined />
                  </span>
                  <span className="label">Wallets</span>
                </NavLink>
              </Menu.Item>
              </>
            )}
            {localStorage.getItem('access_token')
            ? (
            <>
            <SubMenu key="admin" icon={<UserOutlined />} title="Admin">
              <Menu.Item key="home">
                <NavLink to="/admin/home">
                  <span
                    className="icon"
                  >
                    <UsergroupAddOutlined />
                  </span>
                  <span className="label">Home</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="users" >
                <NavLink to="/admin/users">
                  <span
                    className="icon"
                  >
                    <UsergroupAddOutlined />
                  </span>
                  <span className="label">User</span>
                </NavLink>
              </Menu.Item>
            </SubMenu>
              
            </>)
            : ('') 
            }
        </Menu>
        </>
    )
}

export default MenuItems;