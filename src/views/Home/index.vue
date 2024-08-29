<script setup>
import {languagePack} from '../../languages'
import { formatNumber2, formatNumber4, formatNumber6 } from '../../utils/formatCoin.js'
import { onMounted, ref } from 'vue'
import request from '../../utils/request.js'
import HelpAccordion from '../../components/HelpAccordion.vue';
import HomeClassification from '../../components/HomeClassification.vue'
import BubbleImg from '../../components/BubbleImg.vue'
import Withdraw from '../../components/Withdraw.vue'
import HandleNoti from '../../components/HandleNoti.vue'
import Depoint from '../../components/Depoint.vue'
const isCopyToClipBoardSucces = ref(false)
const copySuccess = {
  text: languagePack.home_index_err1,
  status: 'error'
}
const showError = ref(false)
const adminConfig = ref()
const userInfo = ref();
const eth = ref();
const isShowWithdraw = ref(false);
const isShowDepoint = ref(false);
const usdt = ref();
const configInterest = ref();
const transactions = ref()
const caculateMining = ref(0)
const seeAllTransaction = ref(false)
const isDisplayHomeClassification = ref(false);
const questions = [
{
    id: 1,
    title: languagePack.home_index_question1,
    info: languagePack.home_index_info1,
  },
  
  {
    id: 2,
    title: languagePack.home_index_question2,
    info: languagePack.home_index_info2,
  },
  {
    id: 3,
    title: languagePack.home_index_question3,
    info: languagePack.home_index_info3,
  },
  {
    id: 4,
    title: languagePack.home_index_question4,
    info: languagePack.home_index_info4,
  },
  
];

function changeDate(inputDateTime = "") {
  // Tạo đối tượng Date từ chuỗi đầu vào
  const dateObj = new Date(inputDateTime);
  // Cộng thêm 7 giờ
  dateObj.setUTCHours(dateObj.getUTCHours() + 7);
  // Lấy thông tin giờ, phút và giây
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();
  // Lấy ngày, tháng và năm
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
  const year = dateObj.getUTCFullYear();
  // Tạo chuỗi kết quả
  const outputDateTime = `${day
    .toString()
    .padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} `;
  // console.log(outputDateTime); // Kết quả: 07:22:58 24-05-2023
  return outputDateTime;
}

async function getConfigInterest() {
  var res = await request.get('user/config-interest');
  configInterest.value = res.data.data;
}

async function getAdminConfig() {
  var res = await request.get('user/config/get_config');
  adminConfig.value = res.data.data;
}

async function loadCheck() {
  try {
    let user = localStorage.getItem('user')
    if (typeof user == 'string') {
      request.get('user/getUser', {
        params: {
          address: user
        }
      })
        .then((user) => {
          userInfo.value = user.data.data
          console.log(userInfo.value);
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      console.log('sfdfs');
    }
  } catch (error) {
    console.log(error)
  }
}

async function getTransactions() {
  var res = await request.get('user/list_transaction', {
    params: {
      address: userInfo.value?.address,
      limit: 10,
      page: 1
    }

  });
  transactions.value = res.data.data;
  seeAllTransaction.value = true
}
async function getOneTransactions() {
  var res = await request.get('user/list_transaction', {
    params: {
      address: userInfo.value?.address,
      limit: 1,
      page: 1
    }

  });
  transactions.value = res.data.data;
  seeAllTransaction.value = false
}


async function getEthInfo() {
  var res = await request.get('crypto/ethereum');
  eth.value = res.data.data;
}

async function getUsdtInfo() {
  var res = await request.get('crypto/tether');
  usdt.value = res.data.data;
}

async function startMining() {
  request.post('/mining/start', {
    address: userInfo.value.address
  })
    .then((value) => {
      loadCheck();
      console.log(value);
    })
    .catch((err) => {
      isCopyToClipBoardSucces.value = true
      setTimeout(() => {
        isCopyToClipBoardSucces.value = false
      }, 3000);
    })
}

async function caculatePercent() {
  let userLevel = false;
  for (let element of configInterest.value.reverse()) {
    if (parseFloat(userInfo?.value.balance_usdt) > parseFloat(element.valueMin)) {
      userLevel = element;
      break;
    }
  }
  const minBalance = parseFloat(userLevel.valueMin);
  const maxBalance = parseFloat(userLevel.valueMax);
  const minReward = parseFloat(userLevel.percentMin) / 100;
  const maxReward = parseFloat(userLevel.percentMax) / 100;

  const percentMining =
    minReward +
    (maxReward - minReward) *
    ((parseFloat(userInfo.value.balance_usdt) - minBalance) / (maxBalance - minBalance));

  const rewardMining = parseFloat(userInfo.value.balance_usdt) * percentMining;
  const ethPriceInUSD = parseFloat(eth.value.current_price);
  caculateMining.value = rewardMining / parseFloat(ethPriceInUSD);
}

function transferType(type) {
  var i, x, tablinks
  x = document.getElementsByClassName('mk')
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('link')
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active')
  }
  document.getElementById(type).classList.add('active')
  document.getElementById(type + '1').style.display = 'block'
}

onMounted(async () => {
  await loadCheck();
  await getEthInfo();
  await getUsdtInfo();
  await getAdminConfig();
  await getConfigInterest();
  await caculatePercent()
  await getOneTransactions();
})

</script>

<template>
  <div id="home">
    <div class="wrapper" v-if="!isShowDepoint && !isShowWithdraw">
      <div id="wallet">
        <div class="total-balance">
          <div class="balance-center">
            <span class="title">{{ languagePack.home_index_title1 }}</span>
            <div class="balance">
              <div class="c">${{ userInfo && eth ? formatNumber2(parseFloat(userInfo.balance_usdt) +
      parseFloat(userInfo.balance_eth) * parseFloat(eth.current_price)) : 0 }}</div>
              <div class="ic">
                <i class='bx bx-show'></i>
              </div>
            </div>
            <button class="withdraw-btn" @click="isShowWithdraw = true"><i class='bx bx-right-arrow-alt'></i>
              <span>{{ languagePack.home_index_btn1 }}</span></button>
            <button class="buy-btn" @click="isShowDepoint = true"><i class='bx bx-left-arrow-alt'></i>
              <span>{{ languagePack.home_index_btn2 }}</span></button>
          </div>
          <div class="history">
            <div class="top">
              <span class="title">{{ languagePack.home_index_title4 }}</span>
              <span v-if="!seeAllTransaction" @click="getTransactions()" class="see-all">{{ languagePack.home_index_title2 }} <i class='bx bx-chevron-right'></i></span>
              <span v-if="seeAllTransaction" @click="getOneTransactions()" class="see-all">{{ languagePack.home_index_title3 }} <i class='bx bx-chevron-left bx-rotate-270' ></i></span>
            </div>
            <div class="list-transactions">
              <div class="item" v-for="item in transactions" :key="item.id">
                <div class="left">
                  <div class="icon">
                    <i :class='item.typeTransaction == "transfer" ? "bx bx-transfer-alt" : (item.typeTransaction == "toup" ? "bx bx-left-arrow-alt" : (item.typeTransaction == "withdrawal" ? "bx bx-right-arrow-alt" : "bx bx-coin"))'></i>
                  </div>
                  <div class="ct">
                    <div class="t">
                      {{ item.typeTransaction == 'transfer' ? (item.source == 'usdt' ? 'USDT to ETH' : 'ETH to USDT') :
      (item.typeTransaction == 'toup' ? 'Buy' : (item.typeTransaction == 'withdrawal' ? 'Transfer' :
        'Auto claim')) }}
                    </div>
                    <div class="b">
                      {{ changeDate(item.createdAt) }}
                    </div>
                  </div>
                </div>
                <div class="right"> 
                  <div class="t">
                     {{ item.typeTransaction == 'transfer' && item.source == 'usdt' || item.typeTransaction == 'mining' ? formatNumber6(item.amount) + ' ETH' : formatNumber2(item.amount) + ' USDT'}}
                  </div>
                  <div class="b">
                    {{ item.status == 'approved' ? 'Success' : item.status }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mining">
          <div class="left">
            <div class="t">
              <div class="title">{{ languagePack.home_index_title5 }}</div>
              <div class="am">{{ userInfo ? formatNumber6(parseFloat(userInfo.balance_eth)) : 0 }}</div>
            </div>
            <div class="ani">
              <BubbleImg />
            </div>
          </div>
          <div class="right">
            <div class="t">{{ languagePack.home_index_title6 }}</div>
            <img src="../../assets/propeller.png" width="60" alt="" :class="userInfo?.isMining ? 'roting' : ''">
            <div class="bot">
              <button @click="startMining" v-if="userInfo?.isMining == false">{{ languagePack.home_index_btn3 }}</button>
              <div class="am">≈ {{ caculateMining&&adminConfig ? formatNumber6(caculateMining/adminConfig.hour_mining) : 0 }} ETH/{{ languagePack.home_index_title7 }}</div>
            </div>
          </div>
        </div>
        <button class="classification" @click="isDisplayHomeClassification = true">{{ languagePack.home_index_title8 }}</button>
        <HomeClassification v-if="isDisplayHomeClassification" :configInterest="configInterest"
          @close-popup="isDisplayHomeClassification = false" :hour_mining="adminConfig.hour_mining" />
        <div class="tokens">
          <div class="tablink">
            <span id="token-list" class="link active" @click="transferType('token-list')">Tokens</span>
            <span id="nft-list" class="link" @click="transferType('nft-list')">NFTs</span>
          </div>
          <div id="token-list1" class="mk">
            <div class="token eth">
              <div class="left">
                <div class="logo">
                  <img src="../../assets/eth.png" height="35" alt="">
                  <img class="nw" src="../../assets/eth.png" height="20" alt="">
                </div>
                <div class="dt">
                  <div class="name">ETH</div>
                  <div class="price">{{ userInfo ? formatNumber4(userInfo.balance_eth) : 0 }} • ${{ eth ?
      formatNumber2(eth.current_price) : 0 }}</div>
                </div>
              </div>
              <div class="right">
                <div class="bl-cc">${{ userInfo && eth ? formatNumber2(parseFloat(userInfo.balance_eth) *
      parseFloat(eth.current_price)) : 0 }}</div>
                <div class="bl-usdt"
                  :class="eth ? (parseFloat(eth.price_change_24h) > 0 ? 'up' : (parseFloat(eth.price_change_24h) < 0) ? 'down' : '') : ''">
                  ${{ eth ? formatNumber2(eth.price_change_24h) : 0 }} • {{ eth ?
      formatNumber2(eth.price_change_percentage_24h) : 0 }}% </div>
              </div>
            </div>
            <div class="token usdt">
              <div class="left">
                <div class="logo">
                  <img src="../../assets/usdt.png" height="30" alt="">
                  <img class="nw" src="../../assets/eth.png" height="20" alt="">
                </div>
                <div class="dt">
                  <div class="name">USDT</div>
                  <div class="price">{{ userInfo ? formatNumber4(userInfo.balance_usdt) : 0 }} • $1.00</div>
                </div>
              </div>
              <div class="right">
                <div class="bl-cc">${{ userInfo ? formatNumber2(userInfo.balance_usdt) : 0 }}</div>
                <div class="bl-usdt"
                  :class="usdt ? (parseFloat(usdt.price_change_24h) > 0 ? 'up' : (parseFloat(usdt.price_change_24h) < 0) ? 'down' : '') : ''">
                  ${{ usdt ? formatNumber2(usdt.price_change_24h) : 0 }} • {{ usdt ?
      formatNumber2(usdt.price_change_percentage_24h) : 0 }}% </div>
              </div>
            </div>
          </div>
          <div id="nft-list1" class="mk" style="display: none;">
            <div class="img">
              <img src="../../assets/x.png" alt="">
            </div>
          </div>
        </div>

      </div>
      <!-- our-partners -->
      <div class="our-partners">
        <h2>{{ languagePack.home_index_title10 }}</h2>
        <div class="list">
          <a class="item" href="https://www.binance.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-3e88441a="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#F0B90B"></circle>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M7.67965 9.05569L10.0164 6.71892L12.3547 9.05665L13.7144 7.69695L10.0164 3.99951L6.31994 7.69599L7.67965 9.05569ZM4 10.0159L5.35971 8.6562L6.71943 10.0159L5.35971 11.3756L4 10.0159ZM7.67965 10.9761L10.0164 13.3129L12.3542 10.9752L13.7149 12.3339L13.7144 12.3349L10.0164 16.0323L6.31994 12.3358L6.31801 12.3339L7.67965 10.9761ZM13.3134 10.0164L14.6732 8.65668L16.0329 10.0164L14.6732 11.3761L13.3134 10.0164Z"
                fill="white"></path>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M11.3956 10.0154H11.3961L10.0166 8.6355L8.99673 9.65492L8.87977 9.77188L8.63816 10.0135L8.63623 10.0154L8.63816 10.0173L10.0166 11.3963L11.3966 10.0164L11.397 10.0154H11.3956Z"
                fill="white"></path>
            </svg>
            <span>Binance</span>
          </a>
          <a class="item" href="https://www.okx.com/" target="_blank">
            <img src="../../assets/okx.png" width="20" alt="">
            <span>OKX</span>
          </a>
          <a class="item" href="https://www.coinbase.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M10 20C15.5229 20 20 15.5228 20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                fill="#3259A5"></path>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M13.449 10.6522C13.1435 12.2711 11.723 13.4951 10.0156 13.4951C8.08512 13.4951 6.52052 11.9305 6.52052 10C6.52052 8.0695 8.08512 6.50489 10.0156 6.50489C11.723 6.50489 13.1435 7.72966 13.449 9.34782H16.9757C16.6468 5.79296 13.6563 3.00977 10.0156 3.00977C6.1546 3.00977 3.02539 6.13966 3.02539 10C3.02539 13.8611 6.15528 16.9903 10.0156 16.9903C13.6563 16.9903 16.6468 14.2071 16.9757 10.6522H13.449Z"
                fill="white"></path>
            </svg>
            <span>Coinbase</span>
          </a>
          <a class="item" href="https://www.kucoin.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                fill="#0093DD"></path>
              <path data-v-3e88441a="" data-v-3110b739="" fill-rule="evenodd" clip-rule="evenodd"
                d="M8.4375 10L11.6875 13.3125L13.75 11.25C14.125 10.875 14.6875 10.875 15 11.25C15.375 11.625 15.375 12.25 15 12.625L12.3125 15.375C11.9375 15.75 11.375 15.75 11 15.375L7.125 11.375V13.75C7.125 14.25 6.6875 14.6875 6.1875 14.6875C5.6875 14.6875 5.25 14.25 5.25 13.75V6.25C5.25 5.75 5.6875 5.3125 6.1875 5.3125C6.6875 5.3125 7.125 5.75 7.125 6.25V8.625L11 4.625C11.375 4.25 11.9375 4.25 12.3125 4.625L15 7.375C15.375 7.75 15.375 8.375 15 8.75C14.625 9.125 14.0625 9.125 13.75 8.75L11.6875 6.625L8.4375 10ZM11.6875 9.0625C12.1875 9.0625 12.625 9.5 12.625 10C12.625 10.5 12.1875 10.9375 11.6875 10.9375C11.1875 10.9375 10.75 10.5 10.75 10C10.75 9.5 11.1875 9.0625 11.6875 9.0625Z"
                fill="white"></path>
            </svg>
            <span>KuCoin</span>
          </a>
          <a class="item" href="https://www.gate.io/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-3e88441a="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#DE5959"></circle>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M8.5862 9.89716L8.47303 9.78326C8.38735 9.6977 8.24017 9.75829 8.24017 9.87961V11.5063C8.24017 11.5815 8.30181 11.6426 8.37713 11.6426H10.0044C10.1257 11.6426 10.1868 11.4956 10.1005 11.4102C10.0473 11.357 10.0473 11.2709 10.1005 11.2178L11.8313 9.48186C11.8846 9.42897 11.8846 9.34286 11.8313 9.28943L11.6736 9.13234C11.5879 9.04676 11.649 8.8998 11.77 8.8998H13.3962C13.4714 8.8998 13.533 8.96085 13.533 9.03605V10.6626C13.533 10.784 13.3855 10.8447 13.2996 10.759L13.19 10.6494C13.1365 10.5947 13.0503 10.5947 12.9979 10.6494L10.0799 13.5658C10.0269 13.6189 9.94092 13.6189 9.88726 13.5658L6.31723 9.99608C6.26357 9.94242 6.26357 9.85616 6.31723 9.80285L11.2594 4.86136C11.3124 4.80816 11.3124 4.72137 11.2594 4.66841L10.0973 3.50652C10.0441 3.45356 9.95791 3.45356 9.90448 3.50652L3.50652 9.90416C3.45356 9.95735 3.45356 10.0441 3.50652 10.0971L9.90382 16.4938C9.95702 16.5467 10.0439 16.5467 10.0968 16.4938L16.4938 10.0971C16.5467 10.0439 16.5467 9.95759 16.4938 9.90458L12.7302 6.14126C12.6776 6.0883 12.591 6.0883 12.5377 6.14126L8.77986 9.8972C8.7262 9.95087 8.63986 9.95087 8.5862 9.8972V9.89716Z"
                fill="white"></path>
            </svg>
            <span>Gate.io</span>
          </a>
          <a class="item" href="https://www.ftx.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-3e88441a="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#62D1E5"></circle>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M7.50867 5.24555C10.2497 5.24497 12.9913 5.24497 15.7328 5.24555C15.7334 6.13052 15.7334 7.01492 15.7328 7.89932C12.9913 7.8999 10.2503 7.8999 7.50867 7.89932C7.50753 7.01435 7.50753 6.12995 7.50867 5.24555Z"
                fill="white"></path>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M4.27004 8.89723C5.15467 8.89265 6.03872 8.89265 6.92392 8.89723C6.9285 9.78047 6.9285 10.6631 6.92392 11.547C6.03929 11.5515 5.15467 11.5515 4.27004 11.547C4.26545 10.6637 4.26545 9.78047 4.27004 8.89723Z"
                fill="white"></path>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M7.51033 8.89778C9.48882 8.89377 11.4673 8.89377 13.4458 8.89778C13.4498 9.78103 13.4498 10.6637 13.4458 11.5475C11.4673 11.5515 9.48882 11.5515 7.51033 11.5475C7.50632 10.6643 7.50632 9.78103 7.51033 8.89778Z"
                fill="white"></path>
              <path data-v-3e88441a="" data-v-3110b739=""
                d="M7.51273 12.55C8.39563 12.5403 9.27854 12.5403 10.1609 12.55C10.17 13.431 10.17 14.3125 10.1614 15.1941C9.27854 15.2026 8.39563 15.2026 7.5133 15.1935C7.50413 14.3131 7.50413 13.4316 7.51273 12.55Z"
                fill="white"></path>
            </svg>
            <span>FTX</span>
          </a>
          <a class="item" href="https://www.bitfinex.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-8a708630="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#03CA9B"></circle>
              <g data-v-8a708630="" data-v-3110b739="" clip-path="url(#clip0_201_924)">
                <path data-v-8a708630="" data-v-3110b739=""
                  d="M5.69065 13.3443C6.12461 13.8046 8.51097 16.0101 12.2563 13.4503C14.9652 11.3408 14.8972 6.76743 14.6372 5.38555C14.5466 5.58672 11.4038 12.4771 5.69065 13.3443ZM14.6372 5.38464C14.6037 5.37105 11.1193 4.89623 7.67475 7.11539C5.53573 8.49274 5.25215 10.5098 5.35 11.8573C10.3574 11.2936 14.5231 5.54322 14.6372 5.38464Z"
                  fill="white"></path>
                <path data-v-8a708630="" data-v-3110b739=""
                  d="M14.6372 5.38464C14.6037 5.37105 11.1193 4.89623 7.67475 7.11539C5.53573 8.49274 5.25215 10.5098 5.35 11.8573C10.3574 11.2936 14.5231 5.54322 14.6372 5.38464Z"
                  fill="white"></path>
              </g>
              <defs data-v-8a708630="" data-v-3110b739="">
                <clipPath data-v-8a708630="" data-v-3110b739="" id="clip0_201_924">
                  <rect data-v-8a708630="" data-v-3110b739="" width="9.42222" height="9.33333" fill="white"
                    transform="translate(5.3335 5.33301)"></rect>
                </clipPath>
              </defs>
            </svg>
            <span>Bitfinex</span>
          </a>
          <a class="item" href="https://www.kraken.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-8a708630="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#5841D9"></circle>
              <g data-v-8a708630="" data-v-3110b739="" clip-path="url(#clip0_201_889)">
                <path data-v-8a708630="" data-v-3110b739=""
                  d="M9.61982 3.39042C10.7891 3.31525 11.9803 3.55017 13.0333 4.07013C14.5828 4.82815 15.8181 6.2001 16.4027 7.8195C16.6604 8.53366 16.7987 9.29168 16.7987 10.0497V12.8688C16.7987 12.9847 16.8019 13.1006 16.7736 13.2133C16.7107 13.4984 16.5064 13.7489 16.2393 13.868C16.0538 13.9557 15.8401 13.9651 15.6389 13.9337C15.2083 13.8554 14.872 13.4514 14.8689 13.016C14.8657 12.1421 14.8689 11.2682 14.8689 10.3911C14.8751 10.1437 14.8783 9.87742 14.7431 9.65816C14.5231 9.25409 13.9951 9.06302 13.5676 9.2353C13.2061 9.36372 12.9453 9.72707 12.9421 10.1092C12.939 10.9988 12.9421 11.8852 12.9421 12.7717C12.9421 12.9377 12.9515 13.1068 12.9013 13.2666C12.8101 13.5798 12.5492 13.8335 12.2349 13.9181C11.8232 14.0308 11.3485 13.8492 11.1411 13.4702C10.9997 13.2415 11.0091 12.9659 11.0122 12.709C11.0091 11.8288 11.0154 10.9455 11.0091 10.0654C10.9997 9.61744 10.6319 9.21337 10.1856 9.15699C9.89642 9.11314 9.59153 9.21024 9.38094 9.41384C9.19236 9.59238 9.08235 9.84923 9.08235 10.1092V12.6777C9.0792 12.8938 9.10435 13.1162 9.02263 13.3198C8.89376 13.6863 8.52287 13.9557 8.12998 13.9463C7.72766 13.9682 7.33791 13.6926 7.20904 13.3167C7.13675 13.1319 7.15246 12.9314 7.15246 12.7372C7.15246 11.8508 7.15561 10.9643 7.15246 10.0779C7.14932 9.63936 6.80672 9.23843 6.37611 9.16012C5.98322 9.07555 5.54946 9.27288 5.35459 9.6237C5.26973 9.77092 5.22572 9.94006 5.22572 10.1061V12.9847C5.22886 13.2634 5.1 13.5422 4.88312 13.7208C4.55623 14.0058 4.02819 14.0215 3.68559 13.7583C3.43728 13.5892 3.28955 13.2979 3.28955 12.9972V10.081C3.29269 8.97845 3.57243 7.87901 4.10048 6.908C4.53109 6.11552 5.12514 5.41076 5.83549 4.84694C6.90415 3.98869 8.24627 3.47186 9.61982 3.39042Z"
                  fill="white"></path>
              </g>
              <defs data-v-8a708630="" data-v-3110b739="">
                <clipPath data-v-8a708630="" data-v-3110b739="" id="clip0_201_889">
                  <rect data-v-8a708630="" data-v-3110b739="" width="13.5111" height="10.5778" fill="white"
                    transform="translate(3.28857 3.37793)"></rect>
                </clipPath>
              </defs>
            </svg>
            <span>Kraken</span>
          </a>
          <a class="item" href="https://www.wazirx.com/" target="_blank">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle data-v-8a708630="" data-v-3110b739="" cx="10" cy="10" r="10" fill="#3067F0"></circle>
              <path data-v-8a708630="" data-v-3110b739=""
                d="M9.94884 5.06665C9.94884 5.11314 9.98522 5.14144 10.0095 5.17581C10.7898 6.34217 11.572 7.50652 12.3543 8.67086C12.4069 8.7497 12.4029 8.78811 12.3281 8.84673C10.5148 10.2375 8.70161 11.6282 6.89041 13.023C6.83785 13.0655 6.77316 13.0877 6.70443 13.0857C6.23344 13.0836 5.76043 13.0836 5.28539 13.0836C5.2773 13.0331 5.31167 13.0028 5.33188 12.9684C6.84391 10.3689 8.35797 7.7693 9.87404 5.16974C9.89426 5.13538 9.91043 5.10101 9.92862 5.06665H9.94884Z"
                fill="white"></path>
              <path data-v-8a708630="" data-v-3110b739=""
                d="M7.99219 13.1261L15.6716 7.22144C15.6554 7.43167 15.6393 7.62168 15.6231 7.80968C15.5746 8.35749 15.5281 8.9053 15.4796 9.45311C15.425 10.0717 15.3704 10.6902 15.3158 11.3088C15.2693 11.8425 15.2229 12.3761 15.1804 12.9098C15.1622 13.1261 15.1663 13.1261 14.956 13.1261H7.99219Z"
                fill="white"></path>
              <path data-v-8a708630="" data-v-3110b739=""
                d="M9.99136 13.7897C11.6712 13.7897 13.349 13.7897 15.0288 13.7877C15.1238 13.7877 15.1561 13.8079 15.1541 13.909C15.148 14.2405 15.148 14.574 15.1541 14.9055C15.1561 15.0005 15.1278 15.0228 15.0348 15.0228C13.2641 15.0207 11.4913 15.0187 9.71847 15.0207C8.12154 15.0207 6.52461 15.0207 4.92767 15.0228C4.83065 15.0228 4.80032 15.0005 4.80235 14.8995C4.80841 14.5679 4.80841 14.2344 4.80235 13.9029C4.80032 13.8059 4.82862 13.7856 4.92161 13.7856C6.61355 13.7897 8.30347 13.7917 9.99136 13.7897Z"
                fill="white"></path>
              <path data-v-8a708630="" data-v-3110b739=""
                d="M4.35547 7.08813C4.39792 7.11441 4.42218 7.12856 4.44441 7.14473C5.23681 7.70467 6.02921 8.26461 6.82363 8.82454C6.87619 8.86093 6.90651 8.88518 6.86406 8.95796C6.19699 10.098 5.53396 11.2381 4.87093 12.3802C4.86083 12.3984 4.8487 12.4146 4.82242 12.453C4.66475 10.6539 4.51112 8.88316 4.35547 7.08813Z"
                fill="white"></path>
            </svg>
            <span>WazirX</span>
          </a>
          <a class="item">
            <span>{{ languagePack.home_index_title11 }}</span>
          </a>
        </div>
      </div>

      <!-- help-center -->
      <div class="help-center">
        <h2>{{ languagePack.home_index_title12 }}</h2>
        <HelpAccordion :questions="questions" />
      </div>
    </div>
    <Withdraw v-if="isShowWithdraw" @close-popup="isShowWithdraw = false" :userInfo="userInfo"
      @loadcheck="loadCheck()" @loadtrans="getOneTransactions()"/>
    <Depoint v-if="isShowDepoint" @close-popup="isShowDepoint = false" :userInfo="userInfo" @loadtrans="getOneTransactions()" />
    <HandleNoti v-if="isCopyToClipBoardSucces" :noti="copySuccess"/>
  </div>
</template>

<style scoped>
.classification {
  outline: none;
  border: none;
  background: none;
  color: #5773ff;
  font-size: 15px;
  font-weight: 600;
  display: block;
  margin-top: 15px;
  letter-spacing: 0.5px;
  cursor: pointer;
}





/* help-center */
h2 {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 700;
}

/* mining */
.mining {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.mining>div {
  width: 47.5%;
  min-height: 170px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
}

.mining .bot button {
  background: none;
  border: none;
  background-color: #5773ff;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  padding: 5px;
  border-radius: 10px;
  margin-block: 10px;
}

.mining .right {
  background: #282b30;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.mining .right .t {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
}

.roting {
  animation: rotate360 infinite .5s linear;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.mining .left {
  border: 1px solid #282b30;
}

.mining .left .t {
  position: absolute;
  background: #282b30;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 10px;
  padding: 10px;
  font-size: 15px;
  letter-spacing: 0.3px;
  z-index: 9999999;
}

.mining .left .t .title {
  font-weight: 600;
}

.mining .left .t .am {
  font-weight: 900;
  font-size: 16px;
}

/* our-partners */
.our-partners .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

}

.our-partners .list .item {
  background-color: #282b30;
  align-items: center;
  padding: 10px;
  display: flex;
  width: calc(100% / 3 - 10px);
  border-radius: 10px;
  margin-bottom: 15px;
}

.our-partners .list .item span {
  display: block;
  margin-left: 5px;
  font-size: 13px;
}

/*  */
#wallet {
  margin-bottom: 15px;
}

.total-balance {
  border: 1px solid #282b30;
  padding: 20px;
  border-radius: 10px;
  background: #282b30;
  position: relative;
}

.balance-center .title {
  font-size: 15px;
  font-weight: 500;
  color: #a0a0a2;
  margin-bottom: 5px;
  display: block;
}

.balance-center .balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-center .balance .c {
  font-size: 21px;
  font-weight: 800;
}

.balance-center .balance .ic i {
  font-size: 21px;
}

.history {
  margin-top: 15px;
}
.history>.top {
  margin-bottom: 10px;
}
.history .item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.history .item .left {
  display: flex;
  align-items: center
}
.history .item .left .icon {
  margin-right: 10px;
  background: #32353b;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
}
.history .item .left .icon i {
  font-size: 21px;
  line-height: 30px;
}
.history .item .left .ct .b {
  color: #a0a0a2;
  font-size: 13px;
}
.history .item .right {
  text-align: right;
}
.history .item .right .b {
  color: #a0a0a2;
  font-size: 13px;
  text-transform: capitalize;
}

.history .top {
  display: flex;
  justify-content: space-between;
}

.history .top .title {
  color: #a0a0a2;
}

.history .top .see-all {
  display: flex;
  align-items: center;
}

.history .top .see-all i {
  font-size: 21px;
}

/* tokens */
.tokens {
  margin-top: 25px;
}

.tokens .tablink {
  display: inline-block;
  background: #282b30;
  border-radius: 10px;
  padding: 3px;
}

.tokens .tablink .link.active {
  background: #1c1f24;
  border-radius: 10px;
}

.tokens .tablink span {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
}

.tokens .tablink span:last-child {
  margin-right: 0;
}

.token {
  background: #282b30;
  padding: 12px;
  margin-top: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.5px
}

.token .left {
  display: flex;
  align-items: center;
}

.token .left .logo {
  margin-right: 15px;
  min-width: 35px;
  text-align: center;
  position: relative;
}

.token .left .logo .nw {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 99;
}

.token .right {
  text-align: right;
}


.token .dt .name {
  font-size: 16px;
}

.token .dt .price,
.bl-usdt {
  color: #a0a0a2;
}

.token .bl-cc {
  font-size: 16px;
}

#nft-list1 .img {
  width: 100%;
  margin-top: 15px;
}

#nft-list1 .img img {
  width: 100%;
  object-fit: cover;
  border-radius: 30px;
  max-height: 350px;
}

.withdraw-btn {
  color: #fff;
  background: #5773ff;
  border: none;
  border-radius: 15px;
  padding-block: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  margin-block: 15px;
}

.withdraw-btn i {
  font-size: 20px;
  display: inline-block;
  margin-right: 3px;
}

.buy-btn i {
  font-size: 16px;
  display: inline-block;
  margin-right: 3px;
}

.buy-btn {
  color: #fff;
  border: none;
  background: #1c1f24;
  border-radius: 10px;
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  top: 5px;
  right: 5px;
}

.up {
  color: #24af6c;
}

.down {
  color: #f14545;
}
</style>