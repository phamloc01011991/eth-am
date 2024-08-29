<script setup>
import {languagePack} from '../../languages'
import { onMounted, ref } from 'vue';
import { formatNumber2, formatNumber4, formatNumber6, formatNumber10 } from '../../utils/formatCoin.js'
import request from '../../utils/request.js'

import SwapsReview from '../../components/SwapsReview.vue'

const userInfo = ref();
const eth = ref();
const balanceConvert = ref(0);
const ETHConvert = ref(true);
const isDisplaySwapsReview = ref(false);

function changeCoinConvert() {
  ETHConvert.value = !ETHConvert.value;
}

function setMax() {
  if (ETHConvert.value) {
    balanceConvert.value = userInfo.value.balance_eth
  } else {
    balanceConvert.value = userInfo.value.balance_usdt
  }
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

async function resetSwaps() {
  loadCheck();
  balanceConvert.value = 0;
}



async function getEthInfo() {
  var res = await request.get('crypto/ethereum');
  eth.value = res.data.data;
}

onMounted(async () => {
  loadCheck();
  getEthInfo();
})
</script>

<template>
  <div id="wrapper">
    <div id="swaps">
      <div class="select-coin">
        <div class="coin" v-if="ETHConvert">
          <div class="img">
            <img src="../../assets/eth.png" height="35" alt="">
          </div>
          <div class="ct">
            <div class="top">{{ languagePack.swap_index_title1 }}</div>
            <div class="bottom">ETH</div>
          </div>
        </div>
        <div class="coin" v-if="!ETHConvert">
          <div class="img">
            <img src="../../assets/usdt.png" height="30" alt="">
          </div>
          <div class="ct">
            <div class="top">{{ languagePack.swap_index_title1 }}</div>
            <div class="bottom">USDT</div>
          </div>
        </div>
        <div class="center">
          <button @click="changeCoinConvert">
            <img src="../../assets/right-arrow.png" width="25" alt="">
          </button>
        </div>

        <div class="coin" v-if="ETHConvert">
          <div class="img">
            <img src="../../assets/usdt.png" height="30" alt="">
          </div>
          <div class="ct">
            <div class="top">{{ languagePack.swap_index_title2 }}</div>
            <div class="bottom">USDT</div>
          </div>
        </div>
        <div class="coin" v-if="!ETHConvert">
          <div class="img">
            <img src="../../assets/eth.png" height="30" alt="">
          </div>
          <div class="ct">
            <div class="top">{{ languagePack.swap_index_title2 }}</div>
            <div class="bottom">ETH</div>
          </div>
        </div>
      </div>
      <div class="balance-swaps">
        <div class="balance">
          <input type="number" v-model="balanceConvert">
        </div>
        <div class="bottom">
          <div class="note">
            {{ userInfo ? (ETHConvert ? formatNumber6(parseFloat(userInfo.balance_eth)) :
          formatNumber2(parseFloat(userInfo.balance_usdt))) : 0 }} {{ ETHConvert ? 'ETH' : 'USDT' }} {{ languagePack.swap_index_title3 }}
          </div>
          <div class="btn">
            <button>USDT</button>
            <button @click="setMax()">{{ languagePack.swap_index_title4 }}</button>
          </div>
        </div>
      </div>
      <div class="reviews">
        <div class="item">
          <div class="right">
            {{ languagePack.swap_index_title5 }}
          </div>
          <div class="left">
            {{ eth ? ETHConvert ? formatNumber2(balanceConvert * parseFloat(eth.current_price)) + ' USDT' :
          formatNumber10(balanceConvert / parseFloat(eth.current_price)) + ' ETH' : 0 }}
          </div>
        </div>
        <div class="item">
          <div class="right">
            {{ languagePack.swap_index_title6 }}
          </div>
          <div class="left" v-if="ETHConvert">
            1 ETH = {{ eth ? (formatNumber2(parseFloat(eth.current_price))) : 0 }} USDT
          </div>
          <div class="left" v-if="!ETHConvert">
            1 USDT = {{ eth ? (formatNumber10(1 / parseFloat(eth.current_price))) : 0 }} ETH
          </div>
        </div>
      </div>
      <div class="button-review">
        <button
        @click="isDisplaySwapsReview = true"
          :class="userInfo ? (ETHConvert && balanceConvert > 0 && (balanceConvert <= userInfo.balance_eth) ? 'active' : (!ETHConvert && balanceConvert > 0 && (balanceConvert <= userInfo.balance_usdt) ? 'active' : '')) : ''"
          :disabled="userInfo ? (ETHConvert && balanceConvert > 0 && (balanceConvert <= userInfo.balance_eth) ? false : (!ETHConvert && balanceConvert > 0 && (balanceConvert <= userInfo.balance_usdt) ? false : true)  ) : true">{{ languagePack.swap_index_title7 }}</button>
      </div>
    </div>
    <SwapsReview v-if="isDisplaySwapsReview" :ETHConvert="ETHConvert" :balanceConvert="balanceConvert" :eth="eth" :address="userInfo.address" @close-popup="isDisplaySwapsReview = false" @resetSwaps="resetSwaps()"/>
  </div>
</template>

<style scoped>
#wrapper {
  position: relative;
}
/* select-coin */
.select-coin {
  display: flex;
  justify-content: space-between;
  position: relative;
  background: #282b30;
  border-radius: 10px;
  padding: 10px;
}

.select-coin .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.select-coin .coin {
  display: flex;
  align-items: center;
}

.select-coin .coin img {
  margin-right: 10px;
}

.select-coin .ct .top {
  color: #a0a0a2;
  font-size: 13px;
}

.select-coin .ct .bottom {
  font-size: 15px;
  font-weight: 500;
}

.center button {
  background: none;
  border: 1px solid #676868;
  border-radius: 10px;
  cursor: pointer;
}

/* balance-swaps */
.balance-swaps {
  margin-block: 75px;
  text-align: center;
}

.balance-swaps .balance {}

.balance-swaps .balance input {
  background: none;
  border: none;
  outline: none;
  font-size: 40px;
  font-weight: 800;
  color: #fff;
  display: inline-block;
  width: 100%;
  text-align: center;
  max-width: 100%;
}

.balance-swaps .bottom .note {
  font-size: 15px;
  color: #a0a0a2;
  margin-block: 10px;
}

.balance-swaps .bottom .btn button {
  padding: 7px 10px;
  border-radius: 15px;
  border: 1px solid #a0a0a2;
  background: none;
  color: #a0a0a2;
}

.balance-swaps .bottom .btn button:last-child {
  margin-left: 10px;
  cursor: pointer;
}

/* reviews */
.reviews {
  color: #a0a0a2;
}

.reviews .item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* button-review */
.button-review {
  margin-top: 20px;
}

.button-review button {
  width: 100%;
  padding-block: 15px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
  border: none;
  background: #3c425d;
  color: #fff;
  cursor: pointer;
}

.button-review button.active {
  background: #5773ff;
}
</style>