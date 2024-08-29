import axios from 'axios'
import { getAccount } from '@wagmi/core'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet } from 'viem/chains'
const request = axios.create({
  baseURL:import.meta.env.VITE_API_URL+'api',
});

export const setAuth = ()=>{
  const user = localStorage.getItem("user")
  console.log(user);
  if(!user) {
    const projectId = '6d1e12cf26f9c187a8699c5e6763319a';
    const metadata = {
      name: 'Web3Modal',
      description: 'Web3Modal Example',
      url: 'https://web3modal.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }

    const chains = [mainnet]
    const config = defaultWagmiConfig({
      chains,
      projectId,
      metadata
    })
    let check = getAccount(config)
    if(check.isConnected) {
      localStorage.setItem('user', check.address);
    }
  }
}

setAuth()

export default request