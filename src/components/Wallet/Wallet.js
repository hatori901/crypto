import React, { useEffect,useState } from 'react';
import { Form,Table,Button, Modal,Input, message,Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom'
import { InfoCircleOutlined } from '@ant-design/icons';
import { useMoralis } from 'react-moralis';
import axios from 'axios';

export default function Wallet(){
    const {isAuthenticated,user,setUserData} = useMoralis();
    const [isAddModal,setIsAddModal] = useState(false)
    const [address,setAddress] = useState()
    const location = useNavigate();
    const mainAddress = isAuthenticated ? {
        key : user.get("accounts")[0],
        name : "Main Wallet",
        address : user.get("accounts")[0],
    } : ""
    useEffect(()=>{
        if (!isAuthenticated){
           return
        }
        !user.get("wallets") ? setUserData({wallets : [mainAddress]}) : setAddress(user.get("wallets"))
    },[isAuthenticated,user])
    // useEffect(()=>{
    //     if(!isAuthenticated){
    //         return
    //     }
    //     if(address) user.save("wallets",address) 
    // },[isAuthenticated,user,address])
    const onFinish = async (values) => {
        await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${values.walletAddress}&tag=latest&apikey=DDQKH2R8MS25NCAF58J4RCPA1EB79MU64V`)
        .then((response)=>{
            if(response.data.status === "1"){
                let check = user.get("wallets").some(obj => obj.address === values.walletAddress)
                if(!check){
                    user.set("wallets",[
                        ...address,
                        {key: values.walletAddress,
                        name: values.walletName,
                        address: values.walletAddress}
                    ])
                    user.save()
                    setAddress(user.get("wallets"))
                    setIsAddModal(false)
                }else{
                    message.info("wallet is exist")
                }
            }else{
                message.error(response.data.result);
            }
        }).catch((error)=>{
            console.error(error);
        })
        
        
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }
    const onView = (values) =>{
        location(`/wallets/${values.address}`)
    }
    const onDelete = (values) =>{
        setAddress(address.filter(address => address.address !== values))
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
                    <>
                    <Button style={{marginInline: "10px"}} type="primary" onClick={()=>onView(x)}>View</Button>
                    {x.address !== user.get("accounts")[0] ? (<Popconfirm title="Sure to delete?" onConfirm={() => onDelete(x.address)}>
                        <Button danger>Delete</Button>
                    </Popconfirm>) : ""}
                    </>
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
                    rounded={'lg'}
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
                        onFinishFailed={onFinishFailed}
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