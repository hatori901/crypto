import React,{useState,useEffect} from "react";
import {Card, Row,Col} from 'antd'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Home(){
    const [users,setUsers] = useState()
    const location = useNavigate()
    useEffect(()=>{
      if(!localStorage.getItem('access_token')){
        location('/admin')
      }
      axios.get('http://localhost:4000/user',{
        headers: {
          'x-access-token': localStorage.getItem('access_token')
        }
      })
      .then((response)=>{
        setUsers(response.data.length - 1);
      })
    },[])

  
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Row>
              <Col span={8} style={{paddingInline:"10px"}}>
                <Card title="Users" bordered={false}>
                  {users} Users
                </Card>
              </Col>
              <Col span={8} style={{paddingInline:"10px"}}>
                <Card title="Verified Users" bordered={false}>
                  Users
                </Card>
              </Col>  
            </Row>
        </div>
    )
}