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
        <Menu style={{
            fontSize: "18px",
            fontWeight: "bold"
          }} theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
            <Menu.Item key="/" icon={<AppstoreOutlined />}>
                <NavLink to="/">Dashboard</NavLink>
            </Menu.Item>
            {isAuthenticated && (
              <>
              <Menu.Item key="wallets" icon={<ContainerOutlined />}>
                <NavLink to="/wallets">Wallets</NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Address Book
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Deals">
                <Menu.Item key="4">IDO Deals</Menu.Item>
                <Menu.Item key="5">IKO Deals</Menu.Item>
              </SubMenu>
              </>
            )}
            {localStorage.getItem('access_token')
            ? (
            <>
            <SubMenu key="admin" icon={<UserOutlined />} title="Admin">
              <Menu.Item key="home" icon={<UsergroupAddOutlined />}>
                <NavLink to="/admin/home">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="users" icon={<UsergroupAddOutlined />}>
                <NavLink to="/admin/users">Users</NavLink>
              </Menu.Item>
            </SubMenu>
              
            </>)
            : ('') 
            }
        </Menu>
    )
}

export default MenuItems;