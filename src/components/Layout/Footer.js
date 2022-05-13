import { Layout, Row, Col } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter className={'bg-gray-800'}>
        <div className={'bg-black'}>
          <p className={'text-white px-12'}>All Rights Reserved - Kommunitas 2022 | Powered by Polygon & Safepal</p>
        </div>
    </AntFooter>
  );
}

export default Footer;
