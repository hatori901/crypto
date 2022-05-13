import React, { useEffect,useState } from 'react';
import emailjs from '@emailjs/browser';
import {Result,Button, message} from 'antd'
import { useMoralis } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import ReactCodeInput from 'react-verification-code-input';

export default function Verify(){
    const {isAuthenticated,user,setUserData} = useMoralis()
    const [code,setCode] = useState()
    const [codeVerif,setCodeVerif] = useState()
    const location = useNavigate()
    const generateCode = () =>{
        return Math.floor(Math.random()* 899999 + 100000)
    }
    useEffect(()=>{
        if(!codeVerif) setCodeVerif(generateCode())
    },[codeVerif])
    const confirm = () =>{
        if(code.length === 6){
            if(code === user.get("codeVerif")){
                setUserData({
                    codeVerif: null,
                    verified: true
                })
                message.success("Your account has been verified")
                location("/")
            }else{
                message.info("wrong code")
            }
        }else{
            message.info("Please input valid code")
        }

    }
    const onInputHandle = async (props) => {
        setCode(props)
    }

    const resend = () =>{
        if(!isAuthenticated){
            return
        }
        setCodeVerif(generateCode())
        
        emailjs.send('service_sdgrjz2','template_68tl53f',
        {
            to_name: "$KOMmunity!",
            to_email: user.get("email"),
            message: `Verification code :${codeVerif}`
        }
        ,'FBKbcDymjHqaTj4d8')
        setUserData({
            codeVerif: codeVerif
        })
    }

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    
        <Result
            status="success"
            title="Code Verification Sent!"
            subTitle="Please enter the verification code,
            we send to your email address"
        />
        <div style={{display:"flex",justifyContent: "center"}}>
            <ReactCodeInput fields={6} onChange={onInputHandle}/>
        </div>
        <div style={{display: "block",textAlign: "center",paddingBlock:"20px",marginInline:"20px"}}>
            <Button type="primary" htmlType="submit" onClick={confirm}>
                    Confirm
            </Button>
            <Button style={{marginInline: "10px"}} onClick={resend}>
                    Re-Send code verification
            </Button>
        </div>
        </div>
    )
}


