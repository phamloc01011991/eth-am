<script setup>
import { onMounted, ref } from 'vue';
import { languagePack } from '../languages'
import request from '../utils/request';
import HandleNoti from './HandleNoti.vue'
const isCopyToClipBoardSucces = ref(false)
const config = ref();
const amount = ref(0);
const showSuccess = ref(false);
const emit = defineEmits(['close-popup', 'loadtrans']);
const errNoti = {
  text: '',
  status: ''
}

const closePopup = () => {
  loadtrans();
  emit('close-popup');
};
const loadtrans = () => {
  emit('loadtrans');
};
const props = defineProps({
  userInfo: Object,
});

async function getConfig() {
  var res = await request.get('user/config/get_config');
  config.value = res.data.data;
}

async function depoint() {
  document.getElementsByClassName('btnbuy')[0].disabled = true;
  if (amount.value >= 50 && amount.value <= 1000000) {
    request
      .post('/user/topup-trans', {
        address: props.userInfo.address,
        amount: amount.value,
      })
      .then((res) => {
        if (res.data.message == 'Top-up transaction created successfully') {
          showSuccess.value = true;
          document.getElementsByClassName('btnbuy')[0].disabled = '';
        }
      })
      .catch((err) => {
        errNoti.text = languagePack.system_error;
        errNoti.status = 'error'
        isCopyToClipBoardSucces.value = true
        setTimeout(() => {
          isCopyToClipBoardSucces.value = false
        }, 3000);
        document.getElementsByClassName('btnbuy')[0].disabled = '';
      });
  } else {
    errNoti.text = languagePack.depoint_err1;
    errNoti.status = 'error'
    isCopyToClipBoardSucces.value = true
    document.getElementsByClassName('btnbuy')[0].disabled = '';
    setTimeout(() => {
      isCopyToClipBoardSucces.value = false
    }, 3000);
  }
}

function copyClipboard(textToCopy) {
  if (!navigator.clipboard) {
    errNoti.text = languagePack.depoint_err2;
    errNoti.status = 'error'
    isCopyToClipBoardSucces.value = true
      setTimeout(() => {
        isCopyToClipBoardSucces.value = false
      }, 3000);
  } else {
    // Sao chép nội dung vào bộ nhớ đệm
    navigator.clipboard.writeText(textToCopy).then(function () {
     
      errNoti.text = languagePack.depoint_err3
      errNoti.status = 'success'
      isCopyToClipBoardSucces.value = true
      setTimeout(() => {
        isCopyToClipBoardSucces.value = false
      }, 3000);
    });
  }
}

function onReady(token) {
  var qrcode = new QRCode(document.getElementById('id_qrcode'), {
    width: 250,
    height: 250,
  });
  qrcode.makeCode(token);
}

onMounted(async () => {
  await getConfig();
  onReady(config?.value.address_admin);
});
</script>

<template>
  <div id="depoint">
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
          <h4>{{ languagePack.depoint_title }}</h4>
        </div>
        <div class="cskh">
          <i class="bx bx-headphone" style="font-size: 23px"></i>
        </div>
      </div>

      <div class="center-depoint">
        <div class="note">{{ languagePack.depoint_title1 }}</div>
        <input type="number" v-model="amount" class="input_amount" />
        <div class="note">{{ languagePack.depoint_note }}</div>
        <div class="qr_code" id="id_qrcode"></div>
        <div class="address">
          <span class="title">{{ languagePack.depoint_wallet_adress }}</span>
          <p class="ad">
            {{ config?.address_admin }}
            <i
              style="font-size: 17px; margin-left: 3px"
              class="bx bx-copy bx-rotate-270"
              @click="copyClipboard(config?.address_admin)"
            ></i>
          </p>
        </div>
        <button class="btnbuy" @click="depoint">{{ languagePack.depoint_btn }}</button>
      </div>
      <div class="support">
        <div class="item">
          <div class="title">{{ languagePack.depoint_support_title1 }}</div>
          <p>
            {{ languagePack.depoint_support_answer1 }}
          </p>
        </div>
        <div class="item">
          <div class="title">{{ languagePack.depoint_support_title2 }}</div>
          <p>
            {{ languagePack.depoint_support_answer2 }}
          </p>
        </div>
      </div>
      <div class="notifi-done" v-if="showSuccess">
        <div class="noti-sc">
          <i class="bx bx-check-circle"></i>
          <p class="noty">
            {{ languagePack.depoint_noti1 }} <br />{{ languagePack.depoint_noti2 }}
          </p>
          <div class="money">
            <button class="" @click="closePopup()">{{ languagePack.depoint_noti_btn }}</button>
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

.money button {
  padding: 10px 20px;
  background: #5773ff;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
}

.wrapper {
  position: relative;
}

#depoint {
  position: fixed;
  width: 100%;
  max-width: 1280px;
  height: 100vh;
  min-height: 100vh;
  top: 0;
  left: 0;
  background: #181818;
  padding: 45px 15px 85px 15px;
  z-index: 99999999;
  overflow-y: scroll;
}

.top {
  display: flex;
  position: relative;
  line-height: 1.4;
  margin-bottom: 25px;
  justify-content: space-between;
  align-items: center;
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
  font-size: 16px;
}

.top .center span {
  color: #a0a0a2;
}

.qr {
  width: 300px !important;
  height: 300px !important;
}

.center-depoint {
  padding: 40px 20px 35px 20px;
  background: #282b30;
  border-radius: 10px;
  text-align: center;
  position: relative;
}

.center-depoint .qr_code {
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
}

.address {
  padding-inline: 20px;
}

.address .title {
  color: #a0a0a2;
}

.address .ad {
  word-break: break-all;
}

.support {
  background: #282b30;
  border-radius: 10px;
  padding: 10px 10px;
  margin-top: 20px;
}

.support .item {
  padding: 10px;
}

.support .item p {
  color: #a0a0a2;
}

.input_amount {
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
  margin-block: 20px;
}

.btnbuy {
  color: #fff;
  width: 100%;
  display: block;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  border-radius: 10px;
  outline: none;
  border: none;
  background-color: #5773ff;
  margin-top: 20px;
}

.notifi-done {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
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
</style>
