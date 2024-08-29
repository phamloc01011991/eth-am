<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { mainnet } from 'viem/chains'
import { reconnect } from '@wagmi/core'
import Footer from './components/Footer.vue'
import { useAccountEffect } from '@wagmi/vue'
import request from './utils/request.js'
import PopLang from './components/PopLang.vue'
const showPopLang = ref(false)
const account = ref();
const invitedCode = ref('')
const invitedCodeOK = ref('')

let locations = JSON.parse(localStorage.getItem('locations') || null)
async function checkIpLocation() {
  if (locations == null) {
    locations = {
      language: 'EN'
    }
    localStorage.setItem('locations', JSON.stringify(locations))
  }
}
checkIpLocation();


function getCurrentURL() {
  let href = window.location.href;
  var parts = href.split("/");
  if (parts[parts.length - 1]) {
    invitedCode.value = parts[parts.length - 1]
    if(invitedCode.value != 'home' && invitedCode.value != 'market' && invitedCode.value != 'swaps' && invitedCode.value != 'friends' && invitedCode.value != 'history') {
      invitedCodeOK.value = invitedCode.value
    }
  }
}

const interval = ref();
const projectId = '6d1e12cf26f9c187a8699c5e6763319a';
const metadata = {
  name: 'ETH AM',
  description: 'ETH AM',
  url: 'https://eth-am.net',
  icons: ['./assets/logo.svg']
}

const chains = [mainnet]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

reconnect(config)
.then((val)=> {
  localStorage.setItem('user', val[0].accounts[0]);
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false
})

useAccountEffect({
  config,
  onConnect(data) {

    request.post('/connect-wallet', {
      address: data.address,
      invitedCode: invitedCodeOK.value
    })
      .then(() => {
        localStorage.setItem('user', data.address);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
  },
  onDisconnect() {
    localStorage.removeItem('user');
    window.location.reload();
  },
})
function showLang() {
  showPopLang.value = true
}

onMounted(async () => {
  getCurrentURL()
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div id="site">
    <div class="top">
      <div class="left">
        <img src="./assets/logo.svg" alt="" width="30" height="30">
        <h1>ETH AM</h1>
      </div>
      <div class="right">
        <w3m-button balance="false" />
        <i class="bx bx-world"  @click="showLang()"></i>
      </div>
    </div>
    <RouterView />
    <Footer />
    <PopLang v-if="showPopLang == true" @close-popup="showPopLang = false"/>
  </div>
</template>

<style scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}

.left {
  display: flex;
  align-items: center;
}

.left h1 {
  margin-left: 10px;
  font-size: 20px;
}
.right {
  display: flex;
  align-items: center;
}
.right i {
  font-size: 23px;
  margin-left: 10px;
  color: #5773ff;
}
</style>