import { useState,useEffect } from 'react';
import { Card, Col, Form, Input, Row,Button } from 'antd';
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const { isAuthenticated, user} = useMoralis();
    const [email,setEmail] = useState()
    const location = useNavigate()
    useEffect(()=>{
        if (!isAuthenticated){
           return
        }
        !user.attributes.email ? setEmail(null) : setEmail(user.attributes.email)
    },[isAuthenticated,user])
    const onFinish = async (values) =>{
        user.set("email",values.email)
        await user.save()
        location("/")
    }
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="site-card-wrapper">
                <Row gutter={16} >
                    <Col xs={{span: 24,offset: 0}} sm={{span: 24,offset: 0}} md={{span: 24,offset: 6}} lg={{span: 12,offset: 6}}>
                        <Card title="Setup Email" bordered={false}>
                            <Form
                                initialValues={{email:"erwinasas"}}
                                onFinish={onFinish}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{required: true,message: "Please input your email!"}]}
                                    >
                                    <Input defaultValue={email}/>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset:12, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}