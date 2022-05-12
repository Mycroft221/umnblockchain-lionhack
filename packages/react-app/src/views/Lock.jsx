import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, Radio } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";
import { Address, Balance, Events } from "../components";
import { ethers } from "ethers";
import moment from 'moment';

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
  userSigner,
}) {
  const [amount, setAmount] = useState(0);
  const [ltTokenAddress, setAddress] = useState("");
  const [date, setDate] = useState(0);
  const [approveResponse, setApproveResponse] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenInfo, updateTokenInfo] = useState("fungible");
  const [nftId, setNftId] = useState(0);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Lock Your Tokens</h2>

        <Radio.Group defaultValue="fungible" style={{ marginTop: 16 }} onChange={e => updateTokenInfo(e.target.value)}>
          <Radio.Button value="fungible">Fungible</Radio.Button>
          <Radio.Button value="non_fungible">Non-Fungible</Radio.Button>
        </Radio.Group>

        <div>
          <h4 style={{ marginTop: 16 }}>Token Address</h4>
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </div>

        <div hidden={tokenInfo === "non_fungible"}>
          <h4 style={{ marginTop: 16 }}>Amount</h4>
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setAmount(e.target.value * 10 ** 18);
              }}
            />
          </div>
        </div>

        <div hidden={tokenInfo !== "non_fungible"}>
          <h4 style={{ marginTop: 16 }}>ID</h4>
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setNftId(e.target.value);
              }}
            />
          </div>
        </div>
            <Divider />

        <h4>Unlock Date</h4>

        <div style={{ margin: 8 }}>
          <div style={{ marginTop: 2 }}>
            <DatePicker onChange={(dateMomentObject,dateString) => {
              setDate(dateMomentObject.unix());
              // alert(date);
            }} />
          </div>
            <Divider />
          <p>{errorMessage}</p>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
                 // const provider = new ethers.providers.Web3Provider(window)

                 // You can also use an ENS name for the contract address
                 const jarAddress = "0x983138257cEac59cc47a89A4C5b6a613F342d434";
                 const bondAddress = "0xdBf6dE73c5C57Ea7BEB6Cd5162814cB4612DdA76";

                 // The ERC-20 Contract ABI, which is a common contract interface
                 // for tokens (this is the Human-Readable ABI format)
                 const ltTokenAbi = [{
                  "constant": false,
                  "inputs": [
                      {
                          "name": "_spender",
                          "type": "address"
                      },
                      {
                          "name": "_value",
                          "type": "uint256"
                      }
                  ],
                  "name": "approve",
                  "outputs": [
                      {
                          "name": "",
                          "type": "bool"
                      }
                  ],
                  "payable": false,
                  "stateMutability": "nonpayable",
                  "type": "function"
              }]
                 // The Contract object
                 const tokenContract = new ethers.Contract(ltTokenAddress, ltTokenAbi, userSigner);
                 try {
                  await tokenContract.approve(jarAddress, amount);
                  setErrorMessage("Successfully Approved");
                 } catch (e) {
                  setErrorMessage(e.toString());
                 }
            }}
          >
            Approve
          </Button>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              if (errorMessage != "Successfully Approved") {
                setErrorMessage("Please Approve First");
              }
              else {
                // You can also use an ENS name for the contract address
                const jarAddress = "0x983138257cEac59cc47a89A4C5b6a613F342d434";
                const bondAddress = "0xdBf6dE73c5C57Ea7BEB6Cd5162814cB4612DdA76";
                
                const jarAbi = [
                  {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_unlockTime",
                        "type": "uint256"
                      }
                    ],
                    "name": "_lock",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                      }
                    ],
                    "name": "_unlock",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [],
                    "name": "bond",
                    "outputs": [
                      {
                        "internalType": "contract Bond",
                        "name": "",
                        "type": "address"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      }
                    ],
                    "name": "bonds",
                    "outputs": [
                      {
                        "internalType": "uint256",
                        "name": "unlockTime",
                        "type": "uint256"
                      },
                      {
                        "internalType": "address",
                        "name": "tokenAddress",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_unlockTime",
                        "type": "uint256"
                      }
                    ],
                    "name": "lockFT",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_unlockTime",
                        "type": "uint256"
                      }
                    ],
                    "name": "lockNFT",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                      },
                      {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                      },
                      {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                      }
                    ],
                    "name": "onERC1155BatchReceived",
                    "outputs": [
                      {
                        "internalType": "bytes4",
                        "name": "",
                        "type": "bytes4"
                      }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                      }
                    ],
                    "name": "onERC1155Received",
                    "outputs": [
                      {
                        "internalType": "bytes4",
                        "name": "",
                        "type": "bytes4"
                      }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                      },
                      {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                      },
                      {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
                      }
                    ],
                    "name": "onERC721Received",
                    "outputs": [
                      {
                        "internalType": "bytes4",
                        "name": "",
                        "type": "bytes4"
                      }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                      }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                      {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                      },
                      {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                      }
                    ],
                    "name": "unlockFT",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  },
                  {
                    "inputs": [
                      {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                      }
                    ],
                    "name": "unlockNFT",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                  }
                ];

                const jarContract = new ethers.Contract(jarAddress, jarAbi, userSigner);

                // TODO: fix time
                // const unlockTime = 100;
                // alert(date);
                const lockResponse = (tokenInfo === "non_fungible") ? await jarContract.lockNFT(ltTokenAddress, nftId, date) : await jarContract.lockFT(ltTokenAddress, amount, date);
                window.lockResponse = lockResponse;
                setErrorMessage(amount + " tokens successfully locked. Check your wallet for bond tokens issued.");
            }
            }}
          >
            Lock
          </Button>
        </div>
      </div>
    </div>
  );
}
