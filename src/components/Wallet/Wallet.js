import React, { useEffect, useMemo,useState } from 'react';
import { Form,Table,Button, Modal,Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import { InfoCircleOutlined } from '@ant-design/icons';
import { connectors } from "./config";
import { getEllipsisTxt } from "../../helpers/formatters";
import { useMoralis } from 'react-moralis';

const styles = {
    account: {
      height: "42px",
      padding: "0 15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "12px",
      backgroundColor: "rgb(244, 244, 244)",
      cursor: "pointer",
    },
    text: {
      color: "#21BF96",
    },
    connector: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px 5px",
      cursor: "pointer",
    },
    icon: {
      alignSelf: "center",
      fill: "rgb(40, 13, 95)",
      flexShrink: "0",
      marginBottom: "8px",
      height: "30px",
    },
};

export default function Wallet(){
    const {user,isWeb3Enabled, enableWeb3,isWeb3EnableLoading,isAuthenticated} = useMoralis();
    const [isAddModal,setIsAddModal] = useState(false)
    const [address,setAddress] = useState()
    const location = useNavigate();
    const [mainAddress,setMainAddress] = useState() 
    useEffect(()=>{
        if(isAuthenticated){
            setMainAddress({
                key : user.get("accounts")[0],
                name : "Main Wallet",
                address : user.get("accounts")[0],
            })
        }
    })
    useEffect(()=>{
        if (!isAuthenticated){
           return
        }

        !user.get("wallets") ? user.save("wallets",[mainAddress]) : setAddress(user.get("wallets"))

        
    },[isAuthenticated,user,mainAddress])
    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
          enableWeb3({ provider: connectorId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);
    const onFinish = (values) => {
        user.set("wallets",[
            ...address,
            {key: values.walletAddress,
            name: values.walletName,
            address: values.walletAddress}
        ])
        user.save()
        setIsAddModal(false)
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }
    const onView = (values) =>{
        location(`/wallets/${values.address}`)
    }
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            responsive: ['md'],
        },{
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (x)=>{
                return (
                    <Button onClick={()=>onView(x)}>View</Button>
                )
            }
        }
    ]

    return (
        <>
        {isAuthenticated && (
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Button onClick={()=> setIsAddModal(true)}>Add Wallet</Button>
                <Modal
                    visible={isAddModal}
                    footer={null}
                    onCancel={()=>setIsAddModal(false)}
                    bodyStyle={{
                        padding: "15px",
                        fontSize: "17px",
                        fontWeight: "500",
                    }}
                    style={{fontSize:"16px",fontWeight:"500"}}
                    width="500px"
                >
                <div>
                    <div
                        style={{
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "700",
                            fontSize: "20px",
                        }}
                    >
                        Add Wallet
                    </div>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        >
                        <Form.Item label="Wallet Name"  name='walletName' rules={[{required: true,message: 'Please input wallet name'}]} tooltip={{ title: 'This is a required field', icon: <InfoCircleOutlined /> }}>
                            <Input placeholder="Wallet Name" />
                        </Form.Item>
                        <Form.Item
                            label="Wallet Address"
                            name='walletAddress'
                            rules={[{required: true,message: 'Please input wallet address'}]}
                            tooltip={{ title: 'This is a required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Your Wallet Address"  />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
                </Modal>
                <Table columns={columns} dataSource={address} />
            </div>
        )}
        </>
    )
}