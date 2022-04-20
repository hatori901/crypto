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
    const {user,isWeb3Enabled, enableWeb3,isWeb3EnableLoading,isAuthenticated,Moralis} = useMoralis();
    const [isAddModal,setIsAddModal] = useState(false)
    const [address,setAddress] = useState()
    const location = useNavigate();
    const mainAddress = {
        key : user.get("accounts")[0],
        name : "Main Wallet",
        address : user.get("accounts")[0],
    }
    useEffect(()=>{
        if(!isAuthenticated){
            location("/")
        }
    },[isAuthenticated,location])

    useEffect(()=>{
        if (!isAuthenticated){
           return
        }
        !user.get("wallet") ? user.save("wallet",mainAddress) : setAddress([user.get("wallet")])
        
    },[isAuthenticated,user,mainAddress])
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
        },{
            title: "Action",
            dataIndex: "",
            key: "x",
            render: ()=>{
                return (
                    <Button>View</Button>
                )
            }
        }
    ]
    Moralis.onAccountChanged(async ([account]) =>{
        alert("Link this address to your account?")
        // await Moralis.link(account)
    })

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
                        >
                        <Form.Item label="Wallet Name" required tooltip={{ title: 'This is a required field', icon: <InfoCircleOutlined /> }}>
                            <Input placeholder="Wallet Name" />
                        </Form.Item>
                        <Form.Item
                            label="Wallet Address"
                            required
                            tooltip={{ title: 'This is a required field', icon: <InfoCircleOutlined /> }}
                        >
                            <Input placeholder="Your Wallet Address" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
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