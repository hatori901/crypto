import {useEffect, useState} from "react"
import { Input,Tooltip,Card,Button,Row,Col } from "antd";
import { CopyOutlined } from '@ant-design/icons';

import {useMoralis} from 'react-moralis'
import Title from "antd/lib/typography/Title";





function Refferal(){
    const { isAuthenticated, account,user } = useMoralis();
    const [refferalId,setRefferalId] = useState("")

    const generateId = ()=>{
        var result = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var charaLength = characters.length
        for(var i = 0; i <= 8;i++){
            result += characters.charAt(Math.floor(Math.random() * charaLength))
        }
        user.set("refferal", result)
        user.save();
        return result
    }

    useEffect(()=>{
        if(isAuthenticated){
            !user.attributes.refferal && user.attributes.emailVerified == true ? setRefferalId(generateId()) : setRefferalId(user.get("refferal"));
        }
    },[user,isAuthenticated])

    return (
        <Row>
            <Col xs={24} sm={24} md={12} xl={6}>
                <div className="site-card-border-less-wrapper">
                    <Card title="Refferal Program" bordered={false}>
                    {refferalId && (
                        <>
                        <div style={{marginBlock: "10px"}}>
                            <Title level={5}>Refferal ID</Title>
                            <Input.Group compact>
                                <Input
                                    style={{ width: 'calc(100% - 50px)' }}
                                    defaultValue={refferalId}
                                />
                                <Tooltip title="copy refferal ID">
                                    <Button icon={<CopyOutlined />} />
                                </Tooltip>
                            </Input.Group>
                        </div>
                        <div style={{marginTop: "10px"}}>
                        <Title level={5}>Refferal Link</Title>
                        <Input.Group compact>
                            <Input
                                style={{ width: 'calc(100% - 50px)' }}
                                defaultValue={`https://app.komunitas.net/refferal/${refferalId}`}
                            />
                            <Tooltip title="copy refferal link">
                                <Button icon={<CopyOutlined />} />
                            </Tooltip>
                        </Input.Group>
                        </div>
                        </>
                    )}
                    </Card>
                </div>
            </Col>
            
        </Row>
    )
}

export default Refferal;