import { useState,useEffect } from 'react';
import { Card, Col, Form, Input, Row,Button, message } from 'antd';
import emailjs from '@emailjs/browser';
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const { setUserData} = useMoralis();
    const [codeVerif,setCodeVerif] = useState()
    const location = useNavigate()
    const generateCode = () =>{
        return Math.floor(Math.random()* 899999 + 100000)
    }
    useEffect(()=>{
        if(!codeVerif) setCodeVerif(generateCode())
    },[codeVerif])
    const onFinish = async (values) =>{
        emailjs.send('service_sdgrjz2','template_68tl53f',
        {
            to_name: "$KOMmunity!",
            to_email: values.email,
            message: `Verification code :${codeVerif}`
        }
        ,'FBKbcDymjHqaTj4d8')
        await setUserData({
            email: values.email,
            codeVerif: codeVerif
        },{
            onSuccess: (success) => {
                location("/verify")
            },
            onError: (error) =>{
                return message.info(error.message)
            }
        })
        
    }
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="site-card-wrapper">
                <Row gutter={16} >
                    <Col xs={{span: 24,offset: 0}} sm={{span: 24,offset: 0}} md={{span: 24,offset: 6}} lg={{span: 12,offset: 6}}>
                        <Card title="Setup Email" bordered={false}>
                            <Form
                                layout='vertical'
                                onFinish={onFinish}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{required: true,message: "Please input your email!"}]}
                                    >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Refferal Code (Optional)"
                                    name="refferal"
                                    initialValue={localStorage.getItem("refferer") || ""}
                                    >
                                    <Input />
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