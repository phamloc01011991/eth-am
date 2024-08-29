<script setup>
import { languagePack } from '../languages'
import { onMounted, ref } from 'vue';
const isCopyToClipBoardSucces = ref(false)
import HandleNoti from './HandleNoti.vue'
import {
  formatNumber2,
  formatNumber4,
  formatNumber6,
} from '../utils/formatCoin.js';
import request from '../utils/request';
const props = defineProps({
  userInfo: Object,
});



const errNoti = {
  text: '',
  status: 'error'
}
const showSuccess = ref(false);
const emit = defineEmits(['close-popup', 'loadcheck', 'loadtrans']);

const loadtrans = () => {
  emit('loadtrans');
};
const amount = ref(0);

async function withdraw() {
  document.getElementsByClassName('btn')[0].disabled = true;
  if (amount.value >= 50 && amount.value <= 1000000) {
    request
      .post('/user/withdrawal_trans', {
        address: props.userInfo.address,
        amount: amount.value,
      })
      .then((res) => {
        document.getElementsByClassName('btn')[0].disabled = '';
        if (res.data.message == 'Withdrawal transaction created successfully') {
          loadcheck();
          showSuccess.value = true;
        }
      })
      .catch((err) => {
        errNoti.text = languagePack.system_error;
        errNoti.status = 'error'
        isCopyToClipBoardSucces.value = true
        setTimeout(() => {
          isCopyToClipBoardSucces.value = false
        }, 3000);
        document.getElementsByClassName('btn')[0].disabled = '';
      });
  } else {
    errNoti.text = languagePack.withdraw_err1;
    errNoti.status = 'error'
    isCopyToClipBoardSucces.value = true
    document.getElementsByClassName('btn')[0].disabled = '';
    setTimeout(() => {
      isCopyToClipBoardSucces.value = false
    }, 3000);
  }
}
const loadcheck = () => {
  emit('loadcheck');
};
const closePopup = () => {
  loadtrans()
  emit('close-popup');
  
};
</script>

<template>
  <div id="withdraw">
    <div class="wrapper">
      <div class="top">
        <div class="back">
          <i
            class="bx bx-chevron-left"
            style="font-size: 30px"
            @click="closePopup"
          ></i>
        </div>
        <div class="center">
          <h4>{{ languagePack.withdraw_title1 }}</h4>
          <span>Ethereum</span>
        </div>
      </div>
      <div class="center-info">
        <div class="address">
          <div class="title">{{ languagePack.withdraw_title2 }}</div>
          <input type="text" :value="userInfo?.address" readonly />
        </div>
        <div class="amount">
          <div class="title">
            <div class="left">{{ languagePack.withdraw_title3 }}</div>
            <div class="right">
              {{ userInfo ? formatNumber2(userInfo.balance_usdt) : 0 }} USDT
            </div>
          </div>
          <input type="text" placeholder="0" v-model="amount" />

        </div>
      </div>
      <div class="btn" @click="withdraw">{{ languagePack.withdraw_btn }}</div>
      <div class="notifi-done" v-if="showSuccess">
        <div class="noti-sc">
          <i class="bx bx-check-circle"></i>
          <p class="noty">
            {{ languagePack.withdraw_noti1 }} <br />{{ languagePack.withdraw_noti2 }}
          </p>
          <div class="money">
            <button class="" @click="closePopup()">{{ languagePack.withdraw_btn1 }}</button>
          </div>
        </div>
      </div>
    </div>
    <HandleNoti v-if="isCopyToClipBoardSucces" :noti="errNoti"/>
  </div>
</template>

<style scoped>
.noti-sc i {
  font-size: 35px;
  color: #24af6c;
}
.noti-sc .money {
  margin-top: 15px;
}
.noty {
  margin-top: 15px;
}
.notifi-done {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.money button {
  padding: 10px 20px;
  background: #5773ff;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
}

.noti-sc {
  position: fixed;
  text-align: center;
  background-color: #282b30;
  min-height: 225px;
  border-radius: 10px;
  padding: 25px 12px 45px 12px;
  z-index: 999999999;
  top: 50%;
  right: 15px;
  left: 15px;
  transform: translateY(-50%);
  max-width: 1250px;
}
#withdraw {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  background: #181818;
  padding: 45px 15px 85px 15px;
  z-index: 99999999;
}

.top {
  display: flex;
  position: relative;
  line-height: 1.4;
  margin-bottom: 25px;
}

.top .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.top .center h4 {
  font-weight: 500;
}

.top .center span {
  font-size: 12px;
  color: #a0a0a2;
}

.center-info .title {
  font-size: 13px;
  color: #a0a0a2;
  margin-bottom: 5px;
}

.address {
  margin-bottom: 20px;
}

.address input {
  background: #282b30;
  border: none;
  width: 100%;
  padding: 15px;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  outline: none;
}

.amount .title {
  display: flex;
  justify-content: space-between;
}

.amount input {
  padding: 20px 15px;
  width: 100%;
  border-radius: 5px;
  border: none;
  background: #282b30;
  font-size: 40px;
  outline: none;
  color: #fff;
}

.btn {
  padding: 10px 20px;
  background: #5773ff;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  margin-top: 50px;
}

.btn.active {
  background: #5773ff;
}
</style>
