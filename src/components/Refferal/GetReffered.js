import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import {useMoralis} from 'react-moralis'
export default function GetReffered(){
    const {refferal} = useParams()
    const {isAuthenticated,user,setUserData} = useMoralis();
    const location= useNavigate()
    useEffect(()=>{
        if(!isAuthenticated){
            axios.get(`http://localhost:4000/user/refferal/${refferal}`).then((response)=>{
            if(response.data !== null){
                    localStorage.setItem('refferer',response.data.username)
                }
                location('/')
                
            })
        }
        
    },[isAuthenticated])
}