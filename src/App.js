import { useEffect } from 'react';

import "antd/dist/antd.min.css";
import { useMoralis } from "react-moralis";
import { Routes, Route,useNavigate } from "react-router-dom";
import './App.css';
import './assets/css/main.css'
import './assets/css/responsive.css'
import Main from './components/Layout/Main'

// User
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet/Wallet'
import Balance from './components/Wallet/Balance';
import Signup from './components/Account/Signup.js';
import Verify from './components/Account/Verify';
import GetReffered from './components/Refferal/GetReffered';

// Admin
import Login from './components/Admin/Login';
import Home from './components/Admin/Home'
import Users from './components/Admin/Users';
import DetailUser from './components/Admin/DetailUser';

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user } = useMoralis();
  const location = useNavigate();
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  useEffect(()=>{
    if(!isAuthenticated){
      return
    }
    if(!user.get("email")){
      location("/signup")
    }
  })
  return (
    <div className="App">
      <Main>
        <Routes>
              <Route index path='/' element={<Dashboard/>}/>
              <Route path='/wallets' element={<Wallet/>}/>
              <Route path='/wallets/:address' element={<Balance/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/verify' element={<Verify/>}/>
              <Route path='/refferal/:refferal' element={<GetReffered/>}/>
              <Route path='/admin'>
                <Route index element={<Login/>}/>
                <Route path='home' element={<Home/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='users/:username' element={<DetailUser/>}/>
              </Route>
          </Routes>
      </Main>
    </div>
  );
}

export default App;
