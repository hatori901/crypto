import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function GetReffered(){
    const {refferal} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:4000/user/refferal/${refferal}`).then((response)=>{
            console.log(response);
        })
    },[])
}