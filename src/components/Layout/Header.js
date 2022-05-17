import { useEffect } from "react";
import Account from '../Account/Account'
import {
  Row,
  Col,
  Menu,
  Button,
} from "antd";


import { NavLink } from "react-router-dom";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({
  onPress,
}) {

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={18}>
        <Menu style={{
            fontSize: "18px",
            fontWeight: "bold"
          }} theme="light" mode="horizontal">
            <Menu.Item key="/">
                <NavLink to="/">
                  <span className="label">Homepage</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/docs">
                <NavLink to="/">
                  <span className="label">Docs</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/faq">
                <NavLink to="/">
                  <span className="label">FAQ</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/calendar">
                <NavLink to="/">
                  <span className="label">Calendar</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/bridge">
                <NavLink to="/">
                  <span className="label">Bridge</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/crosschainswap">
                <NavLink to="/">
                  <span className="label">Crosschain Swap</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/staking">
                <NavLink to="/">
                  <span className="label">Staking</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/launchpad">
                <NavLink to="/">
                  <span className="label">Launchpad</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/contactus">
                <NavLink to="/">
                  <span className="label">Contact Us</span>
                </NavLink>
            </Menu.Item>
        </Menu>
        </Col>
        <Col span={24} md={6} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <Account/>
        </Col>
      </Row>
    </>
  );
}

export default Header;
