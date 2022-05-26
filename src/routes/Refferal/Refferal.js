import {useEffect, useState} from "react"
import { Input,Tooltip,Card,Button,Row,Col,message } from "antd";
import { CopyOutlined } from '@ant-design/icons';

import {useMoralis} from 'react-moralis'
import Title from "antd/lib/typography/Title";





function Refferal(){
    const { isAuthenticated,user } = useMoralis();
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
    const copyButton = (text) =>{
        navigator.clipboard.writeText(text)
        message.info('Refferal Copied')
    }
    useEffect(()=>{
        if(isAuthenticated){
            !user.get("refferal") && user.get("verified") === true ? setRefferalId(generateId()) : setRefferalId(user.get("refferal"));
        }
    },[user,isAuthenticated])

    return (
        <Row>
            <Col xs={24} sm={24} md={12} xl={6}>
                <div className="site-card-border-less-wrapper">
                    <Card title="Refferal Program" bordered={false}>
                    {refferalId && user.attributes.verified === true ? (
                        <>
                        <div style={{marginBlock: "10px"}}>
                            <Title level={5}>Refferal ID</Title>
                            <Input.Group compact>
                                <Input
                                    style={{ width: 'calc(100% - 50px)' }}
                                    defaultValue={refferalId}
                                    readOnly={true}
                                />
                                <Tooltip title="copy refferal ID">
                                    <Button onClick={()=>copyButton(refferalId)} icon={<CopyOutlined />} />
                                </Tooltip>
                            </Input.Group>
                        </div>
                        <div style={{marginTop: "10px"}}>
                        <Title level={5}>Refferal Link</Title>
                        <Input.Group compact>
                            <Input
                                style={{ width: 'calc(100% - 50px)' }}
                                defaultValue={`https://app.komunitas.net/refferal/${refferalId}`}
                                readOnly={true}
                            />
                            <Tooltip title="copy refferal link">
                                <Button onClick={()=>copyButton(`https://app.komunitas.net/refferal/${refferalId}`)} icon={<CopyOutlined />} />
                            </Tooltip>
                        </Input.Group>
                        </div>
                        </>
                    ): (
                        <>You need to verify your email to get Refferal ID</>
                    )}
                    </Card>
                </div>
            </Col>
            
        </Row>
    )
}

export default Refferal;