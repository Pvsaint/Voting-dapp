// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Web3 } from 'web3';
import registerVoterAbi from "./abi/registerVoterAbi.json";
import votingAbi from "./abi/votingAbi.json";
import voteTallyAbi from "./abi/voteTallyAbi.json";
import { useState } from 'react';
import { from } from '@apollo/client';

const VOTER_REGISTRATION_CONTRACT_ADDRESS = "0xb8FDc18C44F67bfa5abb3816Af9F50cc23b2F5ac"
const VOTING_CONTRACT_ADDRESS = "0x015557b1160b1D484b497389713b782d24dAd163"
const VOTE_TALLY_CONTRACT_ADDRESS = "0x2A5f5433CaE4Df8C887a606Af5BE582c17902975"
let web3;
function App() {
  const [address, setAddress] = useState(null);

  const initializingContracts = () => {
    const voterRegistrationContract = new web3.eth.Contract(registerVoterAbi.abi, VOTER_REGISTRATION_CONTRACT_ADDRESS)
    const votingContract = new web3.eth.Contract(votingAbi.abi, VOTING_CONTRACT_ADDRESS)
    const voteTallyContract = new web3.eth.Contract(voteTallyAbi.abi, VOTE_TALLY_CONTRACT_ADDRESS)

    return { voterRegistrationContract, votingContract, voteTallyContract }
  }

  const handleSC = async () => {
    const { voterRegistrationContract, votingContract } = initializingContracts();

    // console.log(registerVoterContract);
    const admin = await voterRegistrationContract.methods.admin().call();
    console.log(admin);

    // Starting a new voting session
    console.log(votingContract)
    // const accountAddress = await web3.eth.getAccounts()
    // const votingTx = await votingContract.methods.setVotingParameters(Date.now(), Date.now()).send({ from: accountAddress[0] });

    // console.log('Tx hash: ', votingTx.transactionHash);

    // await handleAddCandidate();
    // await handleGetCandidate();
    // await handleVoteCount()
    await handleVoting();
  }

  const handleRequestRegistration = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const requestTx = await voterRegistrationContract.methods.registrationReqest("12345", true).send({ from: address })

    console.log("Transaction Hash:", requestTx.transactionHash);
  }

  const handleRegisterVoter = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const voterTx = await voterRegistrationContract.methods.registerVoter(0).send({ from: address })

    console.log("Transaction Hash:", voterTx.transactionHash);
  }

  const handleUnregisterVoter = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const voterTx = await voterRegistrationContract.methods.unregisterVoter(1).send({ from: address })

    console.log("Transaction Hash:", voterTx.transactionHash);
  }

  const handleIsRegistered = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const registeredTx = await voterRegistrationContract.methods.isRegistered(0).call()
    console.log("Restered:", registeredTx)

  }

  const handleHasVoted = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const votedTx = await voterRegistrationContract.methods.hasVoted(1).call()
    console.log("Voted:", votedTx)
  }

  const handleAddCandidate = async () => {
    const { votingContract } = initializingContracts();

    const candidateTx = await votingContract.methods.addCandidate("Peter Obi", "LP", "www.google.com").send({ from: address })
    console.log("Transaction Hash: ", candidateTx.transactionHash);

  }

  const handleGetVoter = async () => {
    const { voterRegistrationContract } = initializingContracts();
    const voterTx = await voterRegistrationContract.methods.getVoter(1).call()

    console.log("1st voter:", voterTx)
  }

  const handleGetCandidate = async () => {
    const { votingContract } = initializingContracts();
    const candidate = await votingContract.methods.getCandidate(1).call();

    console.log(candidate)
  }

  const handleVoting = async () => {
    const { votingContract } = initializingContracts();

    try {
      const voteCastTx = await votingContract.methods.castVote(1, 1, "LP").send({ from: address })
      console.log("Vote cast transaction hash: ", voteCastTx.transactionHash)
    } catch (err) {
      console.log(err)
    }

  }

  const handleVoteCount = async () => {
    const { votingContract } = initializingContracts();
    const voteCountTx = await votingContract.methods.getVoteCount(1).call()

    // voteCountTx.toString();
    console.log(voteCountTx.toString())
  }

  const handleSetVotingParams = async () => {
    let startTime = Math.floor(Date.now() / 1000);
    let endTime = Math.floor(new Date(2024, 11, 12));
    const { votingContract } = initializingContracts()

    try {
      const voteParamsTx = await votingContract.methods.setVotingParameters(startTime, endTime).send({ from: address });

      console.log("New Vote Params: ", voteParamsTx.transactionHash);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAnnounceResult = async () => {
    const { voteTallyContract } = initializingContracts();

    try {
      const resultTx = await voteTallyContract.methods.announceResults().send({ from: address })
      console.log("Election Result:", resultTx)
    } catch (err) {
      console.log(err)
    }

  }

  const handleConnect = async () => {
    // check if web3 is available
    if (window.ethereum) {

      // use the browser injected Ethereum provider
      web3 = new Web3(window.ethereum);
      if ((await web3.eth.getChainId()).toString() !== "4202") {
        alert("Connect to a List sepolia network");
        return;
      }

      window.ethereum.enable();

      // get the user's accounts
      web3.eth.getAccounts().then(function (accounts) {
        // show the first account
        console.log(accounts);
        setAddress(accounts[0]);
      });
    } else {
      // if window.ethereum is not available, give instructions to install MetaMask
      console.log('Please install MetaMask to connect with the Ethereum network');
    }
  }
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleSC}>Click
        </button>
        <button onClick={handleConnect}>Connect</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
