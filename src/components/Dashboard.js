import React from 'react';
import Refferal from '../routes/Refferal/Refferal';
import { useMoralis } from "react-moralis";

export default function Dashboard(){
    const { isAuthenticated} = useMoralis();
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {isAuthenticated && (
                <Refferal/> 
            )}
        </div>
    )
}