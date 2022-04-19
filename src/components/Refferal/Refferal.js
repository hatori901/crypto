import {useEffect, useState} from "react"
import { Input,Tooltip,Card,Button } from "antd";
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
            !user.attributes.refferal ? setRefferalId(generateId()) : setRefferalId(user.get("refferal"));
        }
    },[user,isAuthenticated])

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="Refferal Program" bordered={false} style={{ width: 300 }}>
            <Title level={5}>Your Id Refferal</Title>
            {refferalId && (
                <Input.Group compact>
                    <Input
                        style={{ width: 'calc(100% - 50px)' }}
                        defaultValue={refferalId}
                    />
                    <Tooltip title="copy refferal ID">
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            )}
            </Card>
        </div>
    )
}

export default Refferal;