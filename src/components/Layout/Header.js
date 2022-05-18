import { useEffect } from "react";
import Account from '../Account/Account'
import {
  Row,
  Col,
  Menu,
  Button,
} from "antd";

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
                <a href="https://kommunitas.net">
                  <span className="label">Homepage</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/docs">
                <a href="https://docs.kommunitas.net/">
                  <span className="label">Docs</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/faq">
                <a href="https://docs.kommunitas.net/faqs">
                  <span className="label">FAQ</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/calendar">
                <a href="https://calendar.kommunitas.net/">
                  <span className="label">Calendar</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/bridge">
                <a href="https://anyswap.exchange/">
                  <span className="label">Bridge</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/crosschainswap">
                <a href="https://defi.swft.pro/?sourceFlag=KOM&actionCode=xjijukuk2oxkwumxn2o02k5nxu#/">
                  <span className="label">Crosschain Swap</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/staking">
                <a href="https://staking.kommunitas.net/">
                  <span className="label">Staking</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/launchpad">
                <a href="https://launchpad.kommunitas.net/">
                  <span className="label">Launchpad</span>
                </a>
            </Menu.Item>
            <Menu.Item key="/contactus">
                <a href="https://linktr.ee/kommunitas">
                  <span className="label">Contact Us</span>
                </a>
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
