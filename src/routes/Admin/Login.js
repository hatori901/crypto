import React, { useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Row,Col,Card,Form, Input, Button, Checkbox, message } from 'antd';
export default function Login(){
    const location = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem('access_token')){
        location('/admin/home')
      }
    },[location])

    const onFinish = async (values)=>{
        await axios.post('http://localhost:4000/auth/login',{
          username:values.username,
          password:values.password
        }).then((response)=>{
          if(response.status === 200){
            localStorage.setItem('access_token',response.data.accessToken)
            message.success("Login Success")
            location('/admin/home')
          }
          
        }).catch((error)=>{
          message.error(error.response.data.message);
        })
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
            <Input type={'password'} />
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