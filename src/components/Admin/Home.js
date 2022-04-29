import React,{useState,useEffect} from "react";
import {Button, Table} from 'antd'
import { useNavigate } from "react-router-dom";
import { getEllipsisTxt } from "../../helpers/formatters";
import axios from 'axios'

export default function Home(){
    const [users,setUsers] = useState()
    const location = useNavigate()
    useEffect(()=>{
      axios.get('http://localhost:4000/user')
      .then((response)=>{
        setUsers(response.data);
      })
    },[])

    const columns = [
        {
          title: 'Address',
          dataIndex: 'ethAddress',
          key: 'ethAddress',
          render: (ethAddress) => getEllipsisTxt(ethAddress,10)
        },
        {
            title: 'Refferal',
            dataIndex: 'refferal',
            key: 'refferal',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'isVerified',
            dataIndex: 'verified',
            key: 'verified',
            render: (verified) => verified ? "True" : "False"
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (x)=>{
              return (
                <Button type="primary" onClick={()=>{location(`/admin/user/${x.username}`)}}>Details</Button>
              )
            }
          }
    ]
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Table
              bordered
              columns={columns}
              dataSource={users}
              rowKey={(record)=>{
                return record.username
              }}  
            />
        </div>
    )
}