import { useState } from "react";
import { useParams } from "react-router-dom"
import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table,Button,Select} from "antd";
import { getEllipsisTxt } from "../../helpers/formatters";


export default function Balance(){
    let {address} = useParams()
    const { Option } = Select;
    const [chain,setChain] = useState("eth")
    const [loading,setLoading] = useState(false)
    const { data: assets } = useERC20Balances({chain: chain,address: address});
    const { Moralis } = useMoralis();
    const columns = [
        {
          title: "",
          dataIndex: "logo",
          key: "logo",
          responsive: ['md'],
          render: (logo) => (
            <img
              src={logo || "https://etherscan.io/images/main/empty-token.png"}
              alt="nologo"
              width="28px"
              height="28px"
            />
          ),
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          responsive: ['md'],
          render: (name) => name,
        },
        {
          title: "Symbol",
          dataIndex: "symbol",
          key: "symbol",
          render: (symbol) => symbol,
        },
        {
          title: "Balance",
          dataIndex: "balance",
          key: "balance",
          render: (value, item) =>
            parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
        },
        {
          title: "Address",
          dataIndex: "token_address",
          key: "token_address",
          responsive: ['md'],
          render: (address) => getEllipsisTxt(address, 5),
        },
        {
            title: "",
            dataIndex: "",
            key: "x",
            render: () => {
                return (
                    <Button type="error">Hide</Button>
                )
            }
        }
    ];
    const onChainChange = (value) =>{
        setChain(value)
        setLoading(true)
        setLoading(false)
    }
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Skeleton loading={!assets}>
            <Select
                style={{width: "200px"}}
                placeholder="Select a chain"
                onChange={onChainChange}
                defaultValue="eth"
                >
                <Option value="eth">ETH</Option>
                <Option value="bsc">BSC</Option>
                <Option value="polygon">Polygon</Option>
            </Select>
        <Table
          dataSource={assets}
          columns={columns}
          loading={loading}
          rowKey={(record) => {
            return record.token_address;
          }}
        />
      </Skeleton>
        </div>
    )    
}