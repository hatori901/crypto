import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import {useMoralis} from 'react-moralis'
export default function GetReffered(){
    const {refferal} = useParams()
    const {isAuthenticated,} = useMoralis();
    const location= useNavigate()
    useEffect(()=>{
        if(!isAuthenticated){
            localStorage.setItem('refferer',refferal)
            location('/')
        }
        location('/')
        
    },[isAuthenticated,refferal,location])
}