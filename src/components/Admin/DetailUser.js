import axios from "axios";
import React, { useEffect,useState } from "react";
import {Table,Button} from 'antd'
import { useParams } from "react-router-dom";
export default function DetailUser(){
    const {username} = useParams()
    const [wallets,setWallets] = useState()
    useEffect(()=>{
        axios.get(`http://localhost:4000/users/${username}`,{
            headers: {
              'x-access-token': localStorage.getItem('access_token')
            }
          })
        .then((response)=>{
            setWallets(response.data.wallets)
        })
    },[])

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
                    <Button style={{marginInline: "10px"}} type="primary">View</Button>
                    </>
                )
            }
        }
    ]
    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Table columns={columns} dataSource={wallets}/>
        </div>
    )
}