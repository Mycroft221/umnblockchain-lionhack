import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div>
        <br/>
        <h1>Welcome to LockJar!</h1>
        <p style={{paddingLeft: 450, paddingRight: 450}}>LockJar allows you to lock tokens and receive a "bond." This bond can be redeemed for your tokens after the unlock time. This bond can also be sold to another user, allowing a secondary market to develop for LP tokens.</p>
          <br/>
          <h3>Click "Lock" to get started.</h3>
    </div>
  );
}

export default Home;
