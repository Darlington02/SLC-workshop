"use client"
import Image from "next/image";
import Header from "./components/Header";

import { useState } from 'react'
import { Contract, RpcProvider } from 'starknet'
import { useAccount } from "@starknet-react/core";

import contractAbi from './abi/contract.json'
const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

export default function Home() {
  const { account } = useAccount()
  const [retrievedValue, setRetrievedValue] = useState('')

  const increaseCounter = async() => {
    const contract = new Contract(contractAbi, contractAddress, account)
    await contract.increment()
    alert("your counter was increased successfully!")
  }

  const decreaseCounter = async() => {
    const contract = new Contract(contractAbi, contractAddress, account)
    await contract.decrement()
    alert("your counter was decreased successfully!")
  }

  const getCounter = async() => {
    const provider = new RpcProvider({
      nodeUrl: "https://starknet-mainnet.infura.io/v3/b19d3eeaef24491ea6536fd4a48fbd20"
    })

    const contract = new Contract(contractAbi, contractAddress, provider)
    try{
      const counter = await contract.get_current_count()
      setRetrievedValue(counter.toString())
    }
    catch(error: any) {
      console.log(error.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 md:p-24">
      <Header />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src="/starknetlogo.png"
        alt="Starknet Scaffold"
        width={180}
        height={40}
        priority
      />

      <div className="grid">
        <div className="card">
          <h2>Ensure to connect to Mainnet! &rarr;</h2>

          <p>Increase/Decrease Counter.</p>
          <div className="cardForm">
            <input type="submit" className="button" value="Increase" onClick={increaseCounter} />
            <input type="submit" className="button" value="Decrease" onClick={decreaseCounter} />
          </div>

          <hr />
          <div className="cardForm">
            <input type="submit" className="button" value="Get Count" onClick={getCounter} />
            <p>{retrievedValue}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
