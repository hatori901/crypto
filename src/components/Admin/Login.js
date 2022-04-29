import React from "react";
import { Row,Col,Card,Form, Input, Button, Checkbox } from 'antd';
export default function Login(){
    const onFinish = (values)=>{
        console.log(values);
    }
    const onFinishFailed = (error) =>{
        console.log(error);
    }
    return (
        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="site-card-wrapper">
            <Row gutter={16} >
                <Col xs={{span: 24,offset: 0}} sm={{span: 24,offset: 0}} md={{span: 24,offset: 6}} lg={{span: 12,offset: 6}}>
                    <Card title="Login Admin" bordered={false}>
                    <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
      );
}