import { message,Button, Card, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Blockie from "../Blockie";
import Address from "../Address/Address";
import { connectors } from "./config";
import { getExplorer} from "../../helpers/networks"
import { SelectOutlined } from "@ant-design/icons";
import { getEllipsisTxt } from "../../helpers/formatters";
import Input from "antd/lib/input/Input";
import Title from "antd/lib/typography/Title";


const styles = {
    account: {
      height: "42px",
      padding: "0 15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "fit-content",
      borderRadius: "12px",
      backgroundColor: "rgb(244, 244, 244)",
      cursor: "pointer",
    },
    text: {
      color: "#21BF96",
    },
    connector: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px 5px",
      cursor: "pointer",
    },
    icon: {
      alignSelf: "center",
      fill: "rgb(40, 13, 95)",
      flexShrink: "0",
      marginBottom: "8px",
      height: "30px",
    },
  };

  function Account(){
    const { authenticate, isAuthenticated, account,user, chainId, logout } = useMoralis();
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isAuthModalVisible,setIsAuthModalVisible] = useState(false)
    const [isVerified,setIsVerified] = useState(true)
    const [email,setEmail] = useState("")
    useEffect(()=>{
        if (!isAuthenticated){
           return
        }
        !user.attributes.email ? setEmail("") : setEmail(user.attributes.email)
        !user.attributes.emailVerified ? setIsVerified(false) : setIsVerified(true)
    },[isAuthenticated,user])

    if(!isAuthenticated || !account){
        return (
            <>
                <Button type="primary" onClick={()=>setIsAuthModalVisible(true)}>Connect Wallet</Button>
                <Modal
                    visible={isAuthModalVisible}
                    footer={null}
                    onCancel={()=>setIsAuthModalVisible(false)}
                    bodyStyle={{
                        padding: "15px",
                        fontSize: "17px",
                        fontWeight: "500",
                    }}
                    style={{fontSize:"16px",fontWeight:"500"}}
                    width="340px"
                >
                <div>
                    <div
                        style={{
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "20px",
                        }}
                    >
                        Connect Wallet
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {connectors.map(({ title, icon, connectorId }, key) => (
                        <div
                            style={styles.connector}
                            key={key}
                            onClick={async () => {
                            try {
                                await authenticate({ provider: connectorId });
                                window.localStorage.setItem("connectorId", connectorId);
                                setIsAuthModalVisible(false);
                            } catch (e) {
                                message.info(e.message);
                            }
                            }}
                        >
                            <img src={icon} alt={title} style={styles.icon} />
                            <Text style={{ fontSize: "14px" }}>{title}</Text>
                        </div>
                        ))}
                    </div>
                </div>
                </Modal>
            </>
        )
    }

    return (
        <>
            <div
                style={styles.account}
                onClick={()=>setIsModalVisible(true)}

            >
                <p style={{ marginRight: "5px", ...styles.text }}>
                {getEllipsisTxt(account, 6)}
                </p>
                <Blockie currentWallet scale={3} />
            </div>
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                bodyStyle={{
                padding: "15px",
                fontSize: "17px",
                fontWeight: "500",
                }}
                style={{ fontSize: "16px", fontWeight: "500" }}
                width="400px"
            >
                Account
                <Card
                style={{
                    marginTop: "10px",
                    borderRadius: "1rem",
                }}
                bodyStyle={{ padding: "15px" }}
                >
                <Address
                    avatar="left"
                    size={6}
                    copyable
                    style={{ fontSize: "20px" }}
                />
                <div style={{ marginTop: "10px", padding: "0 10px" }}>
                    <a
                    href={`${getExplorer(chainId)}/address/${account}`}
                    target="_blank"
                    rel="noreferrer"
                    >
                    <SelectOutlined style={{ marginRight: "5px" }} />
                    View on Explorer
                    </a>
                </div>
                </Card>
                <Button
                size="large"
                type="primary"
                style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "0.5rem",
                    fontSize: "16px",
                    fontWeight: "500",
                }}
                onClick={async () => {
                    await logout();
                    window.localStorage.removeItem("connectorId");
                    setIsModalVisible(false);
                }}
                >
                Disconnect Wallet
                </Button>
            </Modal>
            {/* {isAuthenticated && !isVerified && (
                    <Modal
                    visible={!isVerified}
                    footer={null}
                    onCancel={null}
                    styleBody={{
                        padding:"16px"
                    }}>
                        <Title level={4}>Verify your email address</Title>
                        <Input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{marginBlock: "10px"}} required={true}/>
                        <div style={{textAlign:"right"}}>
                            <Button type="primary" disabled={email ? false : true} onClick={async () =>{
                                if(email){
                                    user.setEmail(email);
                                    await user.save()
                                }
                                

                            }}>Send Verification</Button>
                        </div>
                    </Modal>
            )} */}
        </>
    )
  }

  export default Account;