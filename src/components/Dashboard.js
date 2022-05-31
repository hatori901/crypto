import React,{useState,useEffect} from 'react';
import { Card,Button,Row,Col } from "antd";
import { useMoralis,useMoralisWeb3Api } from "react-moralis";
import { tokenValue } from '../helpers/formatters';

export default function Dashboard(){
    const { isAuthenticated,user} = useMoralis();
    const Web3Api = useMoralisWeb3Api()
    const [kom,setKom] = useState()

    useEffect(()=>{
        if(!isAuthenticated){
            return
        }
        Web3Api.account.getTokenBalances({addess:user.get("ethAddress"),chain: "polygon"})
        .then((tokens)=> {
            setKom(tokens.filter(token => token.token_address === "0xc004e2318722ea2b15499d6375905d75ee5390b8"));
        })
    },[isAuthenticated])
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row>
            <Col xs={24} sm={24} md={12} xl={6}>
                <div className="site-card-border-less-wrapper">
                    <Card title="Wallet" bordered={false}>
                        <p className='text-2xl font-bold'>{kom ? (
                            tokenValue(kom[0].balance,kom[0].decimals)
                        ): (
                            0
                        )} KOM</p>
                        <Button className='my-3' block>Stake KOM</Button>
                        <Button type="primary" block>Buy KOM</Button>
                    </Card>
                </div>
            </Col>
            
        </Row>
        </div>
    )
}