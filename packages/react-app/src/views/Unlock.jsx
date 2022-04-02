import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";
import { ethers } from "ethers";
import { Address, Balance, Events } from "../components";

export default function Lock({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Unlock Your LP Token</h2>
        <h4>LiquidityProviderTokenBond Address</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
                // // const provider = new ethers.providers.Web3Provider(window)

                // // You can also use an ENS name for the contract address
                // const daiAddress = "dai.tokens.ethers.eth";

                // // The ERC-20 Contract ABI, which is a common contract interface
                // // for tokens (this is the Human-Readable ABI format)
                // const daiAbi = [
                // // Some details about the token
                // "function name() view returns (string)",
                // "function symbol() view returns (string)",

                // // Get the account balance
                // "function balanceOf(address) view returns (uint)",

                // // Send some of your tokens to someone else
                // "function transfer(address to, uint amount)",

                // // An event triggered whenever anyone transfers to someone else
                // "event Transfer(address indexed from, address indexed to, uint amount)"
                // ];

                // // The Contract object
                // const daiContract = new ethers.Contract(daiAddress, daiAbi, localProvider);

                // const name = await daiContract.balanceOf("ricmoo.firefly.eth")
                // alert(name);
            }}
          >
            GetBalance
          </Button>
        </div>
        <Divider />
      </div>
    </div>
  );
}
