import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, Radio } from "antd";
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
  userSigner,
}) {
  const [btAddresss, setBtAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenInfo, updateTokenInfo] = useState("fungible");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Unlock Your Tokens</h2>

        <Radio.Group defaultValue="fungible" style={{ marginTop: 24 }} onChange={e => {
          updateTokenInfo(e.target.value);
          setErrorMessage("");
        }}>
          <Radio.Button value="fungible">Fungible</Radio.Button>
          <Radio.Button value="non_fungible">Non-Fungible</Radio.Button>
        </Radio.Group>

        <h4 style={{ marginTop: 24 }}>Bond ID</h4>
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setBtAddress(e.target.value);
            }}
          />
        </div>

        <div hidden={tokenInfo === "non_fungible"}>
          <h4 style={{ marginTop: 24 }}>Amount</h4>
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setAmount(utils.parseEther(e.target.value));
              }}
            />
          </div>
        </div>
            <Divider />
            <p>{errorMessage}</p>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
                  // You can also use an ENS name for the contract address
                  const jarAddress = "0x983138257cEac59cc47a89A4C5b6a613F342d434";
                  const bondAddress = "0xdBf6dE73c5C57Ea7BEB6Cd5162814cB4612DdA76";                  
                  const bondAbi = [
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "ApprovalForAll",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "previousOwner",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "newOwner",
                          "type": "address"
                        }
                      ],
                      "name": "OwnershipTransferred",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "values",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "TransferBatch",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "TransferSingle",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "value",
                          "type": "string"
                        },
                        {
                          "indexed": true,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "type": "event"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "balanceOf",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address[]",
                          "name": "accounts",
                          "type": "address[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "balanceOfBatch",
                      "outputs": [
                        {
                          "internalType": "uint256[]",
                          "name": "",
                          "type": "uint256[]"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "burn",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "values",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "burnBatch",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "exists",
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
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        }
                      ],
                      "name": "isApprovedForAll",
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
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "mint",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "amounts",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "mintBatch",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "owner",
                      "outputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "renounceOwnership",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "amounts",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeBatchTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "setApprovalForAll",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "string",
                          "name": "newuri",
                          "type": "string"
                        }
                      ],
                      "name": "setURI",
                      "outputs": [],
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
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "totalSupply",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
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
                          "name": "newOwner",
                          "type": "address"
                        }
                      ],
                      "name": "transferOwnership",
                      "outputs": [],
                      "stateMutability": "nonpayable",
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
                      "name": "uri",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    }
                  ];
                  const bondContract = new ethers.Contract(bondAddress, bondAbi, userSigner);
                  
                try {
                    const unlockResponse = await bondContract.setApprovalForAll(jarAddress, true);
                    window.unlockResponse = unlockResponse;
                  setErrorMessage("Successfully Approved");
                 } catch (e) {
                  setErrorMessage(e.toString());
                 }
                }
              }
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
                 // const provider = new ethers.providers.Web3Provider(window)

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

                //  const name = await jarContract.bond();
                //  alert(name);

                try {
                    setErrorMessage("unlocking");
                    console.log(amount);
                    console.log(typeof(amount));
                    const unlockResponse = (tokenInfo === "fungible") ? await jarContract.unlockFT(btAddresss, amount) : await jarContract.unlockNFT(btAddresss);
                    window.unlockResponse = unlockResponse;
                    if(tokenInfo == "fungible") {
                      setErrorMessage("Request to unlock " + utils.formatEther(amount) + " tokens sent. Please check your wallet for status.")
                    } else {
                      setErrorMessage("Request to unlock NFT sent. Please check your wallet for status.")
                    }
                      // setErrorMessage(amount + " tokens successfully unlocked. Check your wallet for liquidity tokens returned.");
                 } catch (e) {
                     window.errorMessageMine = e;
                     if (e.data && e.data.message) {
                        setErrorMessage(e.data.message);
                     } else {
                         setErrorMessage("error");
                     }

                 }
                }
            }}
          >
            Unlock
          </Button>
      </div>
    </div>
  );
}
