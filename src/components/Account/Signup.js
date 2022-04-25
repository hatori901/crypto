import { useState,useEffect } from 'react';
import { Card, Col, Form, Input, Row,Button, message } from 'antd';
import emailjs from '@emailjs/browser';
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const { isAuthenticated, user,setUserData} = useMoralis();
    const [email,setEmail] = useState()
    const [codeVerif,setCodeVerif] = useState()
    const location = useNavigate()
    useEffect(()=>{
        if (!isAuthenticated){
           return
        }
        !user.attributes.email ? setEmail(null) : setEmail(user.attributes.email)
    },[isAuthenticated,user])
    const generateCode = () =>{
        return Math.floor(Math.random()* 899999 + 100000)
    }
    useEffect(()=>{
        if(!codeVerif) setCodeVerif(generateCode())
    },[])
    const onFinish = async (values) =>{
        emailjs.send('service_sdgrjz2','template_68tl53f',
        {
            to_name: "$KOMmunity!",
            email: values.email,
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
                                initialValues={{email: "erwinasfa"}}
                                onFinish={onFinish}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    defaultValue={email}
                                    rules={[{required: true,message: "Please input your email!"}]}
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