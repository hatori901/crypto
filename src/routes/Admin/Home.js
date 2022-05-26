import React,{useState,useEffect} from "react";
import {Card, Row,Col} from 'antd'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import {
  UsergroupAddOutlined
} from '@ant-design/icons'
import Text from "antd/lib/typography/Text";

export default function Home(){
    const [users,setUsers] = useState()
    const [usersVerified,setUsersVerified] = useState()
    const location = useNavigate()
    useEffect(()=>{
      if(!localStorage.getItem('access_token')){
        location('/admin')
      }
      axios.get('http://localhost:4000/users',{
        headers: {
          'x-access-token': localStorage.getItem('access_token')
        }
      })
      .then((response)=>{
        setUsers(response.data.length - 1);
      })
      axios.get('http://localhost:4000/users/verified',{
        headers: {
          'x-access-token': localStorage.getItem('access_token')
        }
      })
      .then((response)=>{
        setUsersVerified(response.data);
      })
    },[location])

  
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row>
              <Col xs={24} sm={24} md={12} xl={8} style={{paddingInline:"10px"}}>
                <Card title="Users" bordered={false}>
                  <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                  <UsergroupAddOutlined style={{fontSize: "50px"}}/>
                  <Text style={{fontSize: "20px"}}>{users} Users</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} xl={8} style={{paddingInline:"10px"}}>
                <Card title="Verified Users" bordered={false}>
                <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}>
                  <UsergroupAddOutlined style={{fontSize: "50px"}}/>
                  <Text style={{fontSize: "20px"}}>{usersVerified} Users</Text>
                  </div>
                </Card>
              </Col>  
            </Row>
        </div>
    )
}