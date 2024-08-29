<script setup>
import {languagePack} from '../../languages'
import { ref, onMounted, reactive, watch } from 'vue';
import Result from '../../components/Result.vue';
import HandleNoti from '../../components/HandleNoti.vue'
import {
  formatNumber2,
  formatNumber4,
  formatNumber6,
} from '../../utils/formatCoin.js';
import request from '../../utils/request.js';
import PopCircle from '../../components/PopCircle.vue';
const userInfo = ref();
const crypto = ref();
const tab = ref(1);
const selectCoin = ref();
const selectCoinValue = ref();
const showErrNoti = ref(false)
const errNoti = {
  text: '',
  status: ''
}


function findCoinBySymbol(symbol) {
  return crypto.value.find(
    (coin) => coin.symbol.toLowerCase() === symbol.toLowerCase()
  );
}

function selectCoinMarket(coin) {
  selectCoin.value = coin;
  selectCoinValue.value = coin.symbol;
  loadViewByTradingView(selectCoinValue.value);
  tab.value = 1;
}

function changeCoin() {
  selectCoin.value = findCoinBySymbol(selectCoinValue.value);
  loadViewByTradingView(selectCoinValue.value);
}

async function loadCheck() {
  let user = localStorage.getItem('user');
  if (typeof user == 'string') {
    request
      .get('user/getUser', {
        params: {
          address: user,
        },
      })
      .then((user) => {
        userInfo.value = user.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('not user in localstorage');
  }
}

function loadViewByTradingView(COIN) {
  try {
    let dt = new TradingView.widget({
      autosize: true,
      symbol: 'BINANCE:' + COIN + 'usdt',
      interval: '30',
      timezone: 'Asia/Ho_Chi_Minh',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#100f15',
      enable_publishing: false,
      hide_legend: true,
      withdateranges: true,
      allow_symbol_change: false,
      save_image: false,
      studies: [
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 20,
          },
        },
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 100,
          },
        },
      ],
      studies_overrides: {
        'volume.volume.color.0': '#dfdfdf',
      },
      container_id: 'tradingview',
    });
  } catch (error) {
    console.log(error);
  }
}

function formatCap(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T'; // Tỷ (Trillion)
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B'; // Tỷ (Billion)
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M'; // Triệu (Million)
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K'; // Ngàn (Thousand)
  } else {
    return num.toString(); // Số nhỏ hơn 1000
  }
}

function formatCurentPrice(value) {
  let stringValue = value.toString();
  let decimalIndex = stringValue.indexOf('.');
  if (decimalIndex === -1) {
    return value.toFixed(2); // Trường hợp số không có phần thập phân, thêm 2 chữ số thập phân
  }

  // Loại bỏ các số 0 ở cuối phần thập phân
  while (stringValue[stringValue.length - 1] === '0') {
    stringValue = stringValue.slice(0, -1);
  }
  if (stringValue[stringValue.length - 1] === '.') {
    stringValue = stringValue.slice(0, -1);
  }

  // Kiểm tra và thêm chữ số thập phân nếu ít hơn 2
  decimalIndex = stringValue.indexOf('.');
  if (decimalIndex === -1) {
    return parseFloat(stringValue).toFixed(2);
  } else {
    let decimalPartLength = stringValue.length - decimalIndex - 1;
    if (decimalPartLength < 2) {
      return parseFloat(stringValue).toFixed(2);
    } else {
      return parseFloat(stringValue);
    }
  }
}
async function getCrypto() {
  var res = await request.get('crypto', {
    params: {
      limit: 50,
    },
  });
  crypto.value = res.data.data;
}

function changeDate(inputDateTime = '') {
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
  const outputDateTime = `${day.toString().padStart(2, '0')}-${month
    .toString()
    .padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} `;
  // console.log(outputDateTime); // Kết quả: 07:22:58 24-05-2023
  return outputDateTime;
}

onMounted(async () => {
  await loadCheck();
  await getCrypto();
  selectCoin.value = findCoinBySymbol('btc');
  selectCoinValue.value = selectCoin.value.symbol;
  loadViewByTradingView(selectCoin.value.symbol);
});
let resultData = reactive({});
const typeCommand = ref('long');
const setTimeThread = ref(60);
const setMassDolar = ref(100);
const showPopCircle = ref(false);
const err_time = ref();
const showResult = ref(false);
const setPercent = ref(0);
const setOrder = ref('');
const networkErr = ref(true);

function formatNumber(num) {
  num = num.toString();
  while (num.charAt(0) === '0' && num.length > 1) {
    num = num.substr(1);
  }
  return num;
}

function setMass(mass) {
  setMassDolar.value = formatNumber(mass);
}

function btnShowPopBuy(command) {
  typeCommand.value = command;
}

function setTime(session) {
  setTimeThread.value = session;
  if (userInfo?.value.balance_usdt < 4000 && session == 90) {
    errNoti.text = languagePack.market_index_err1;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeThread.value = 60;
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
  } else if (userInfo?.value.balance_usdt < 40000 && session == 180) {
    errNoti.text = languagePack.market_index_err2;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeThread.value = 60;
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
  } else if (userInfo?.value.balance_usdt < 100000 && session == 300) {
    errNoti.text = languagePack.market_index_err3;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeThread.value = 60;
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
  }
}

async function buyForex() {
  document.getElementsByClassName('buycf')[0].setAttribute('disabled', '');

  await request
    .get('order_history/check_duplicate', {
      params: {
        address: userInfo?.value.address,
      },
    })
    .then(() => {
      console.log('ok');
    })
    .catch(() => {
      errNoti.text = languagePack.market_index_err4;
      errNoti.status = 'error'
      showErrNoti.value = true
      setTimeout(() => {
        showErrNoti.value = false
      }, 3000);
      document
        .getElementsByClassName('buycf')[0]
        .removeAttribute('disabled', '');
      throw new Error('duplicate');
    });

  if (setTimeThread.value == 0) {
    return;
  }

  resultData = {};
  var res = await order();

  if (res) {
    showPopCircle.value = true;
    setTimeout(async () => {
      await setResultData();
      if (networkErr.value == false) {
        showPopCircle.value = false;
        console.log('Lỗi đường truyền, vui lòng thử lại !!!');
        return;
      } else {
        setTimeout(() => {
          showPopCircle.value = false;
          showResult.value = true;
        }, 5000);
      }
    }, setTimeThread.value * 1000);
  }
}

async function order() {
  networkErr.value = true;

  if (setMassDolar.value < 1) {
    errNoti.text = languagePack.market_index_err5;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
    document.getElementsByClassName('buycf')[0].removeAttribute('disabled', '');
    return;
  }

  if (setMassDolar.value > 1000000) {
    errNoti.text = languagePack.market_index_err6;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
    document.getElementsByClassName('buycf')[0].removeAttribute('disabled', '');
    return;
  }

  var res = await request.post('order_history/order', {
    address: userInfo?.value.address,
    product_name: selectCoinValue?.value,
    order_type: typeCommand.value,
    amount: parseFloat(setMassDolar.value).toFixed(2),
    order_duration: setTimeThread.value + 's',
  });

  if (res.data.success == true) {
    loadCheck();
    setPercent.value = res.data.newOrder.profit_percentage;
    setOrder.value = res.data;
    document.getElementsByClassName('buycf')[0].removeAttribute('disabled', '');
    return true;
  } else {
    errNoti.text = res.data.message;
    errNoti.status = 'error'
    showErrNoti.value = true
    setTimeout(() => {
      showErrNoti.value = false
    }, 3000);
    document.getElementsByClassName('buycf')[0].removeAttribute('disabled', '');
    return false;
  }
}

async function setResultData() {
  try {
    let res = await request.get('order_history/transaction_result', {
      params: {
        order_id: setOrder.value.newOrder.id,
        address: userInfo?.value.address,
      },
    });
    res = res.data;
    console.log(res.success);
    if (res.success == true) {
      var result = res.dataNow;
      console.log(result);
      resultData.percent = result.profit_percentage;
      resultData.type = result.order_type;
      resultData.product = selectCoinValue.value;
      let win = result.order_result.trim() == 'win' ? true : false;
      resultData.win = win;
      resultData.percent_money = result.profit;
      resultData.amount = result.amount;
      return true;
    }
  } catch (error) {
    networkErr.value = false;
  }
}

watch(
  () => showPopCircle.value,
  (val) => {
    loadCheck();
  }
);
</script>

<template>
  <div id="market">
    <div class="wrapper">
      <div class="top-control">
        <div class="ct">
          <div class="item" :class="tab == 1 ? 'active' : ''" @click="tab = 1">
            {{ languagePack.market_index_title1 }}
          </div>
          <div class="item" :class="tab == 2 ? 'active' : ''" @click="tab = 2">
            {{ languagePack.market_index_title2 }}
          </div>
        </div>
      </div>
    </div>
    <div class="transaction" v-show="tab == 1">
      <div class="top">
        <select @change="changeCoin" v-model="selectCoinValue">
          <option
            v-for="(item, index) in crypto"
            :value="item.symbol"
            :key="index"
          >
            {{ item.symbol + 'usdt' }}
          </option>
        </select>
        <div class="r" style="width: 100%;
    display: flex;
    justify-content: space-between;align-items: center;">
          <div
            class="change24"
            :class="
              parseFloat(selectCoin?.price_change_percentage_24h) < 0
                ? 'downn'
                : 'upp'
            "
          >
            {{
              parseFloat(selectCoin?.price_change_percentage_24h) < 0
                ? formatNumber2(
                    selectCoin ? selectCoin?.price_change_percentage_24h : 0
                  )
                : '+' +
                  formatNumber2(
                    selectCoin ? selectCoin?.price_change_percentage_24h : 0
                  )
            }}%
          </div>
          <div class="his">
          <RouterLink
            to="/history"
            class="more"
            style="display: flex; align-items: center; justify-content: right"
          >
            <i class="bx bx-history"></i>
          </RouterLink>
        </div>
        </div>
        
      </div>

      <div id="tradingview"></div>
      <!--=================Buy=========== -->
      <div class="buy">
        <div class="balance">
          <span>{{ languagePack.market_index_title3 }}:</span>
          {{ userInfo ? formatNumber2(userInfo?.balance_usdt) : 0 }} USDT
        </div>
        <!-- ok -->
        <div class="btn-active">
          <span
            class="btns long"
            :class="typeCommand == 'long' ? 'l' : ''"
            @click="btnShowPopBuy('long')"
            >{{ languagePack.market_index_title4 }}</span
          >
          <span
            class="btns short"
            :class="typeCommand == 'long' ? '' : 's'"
            @click="btnShowPopBuy('short')"
            >{{ languagePack.market_index_title5 }}</span
          >
        </div>
        <!-- ok -->
        <div class="center-time">
          <div class="center-time__title">
            <h4>{{ languagePack.market_index_title6 }}</h4>
          </div>
          <div class="center-time__body">
            <div
              :class="[
                setTimeThread == 60
                  ? 'center-time__object select'
                  : 'center-time__object',
                userInfo?.balance_usdt >= 1 ? '' : 'order_command_disable',
              ]"
              @click="setTime(60)"
            >
              <i class="bx bxs-lock-alt" style="color: rgb(250, 250, 250)"></i>
              60 <span>{{ languagePack.market_index_title7 }}</span> {{}}
            </div>
            <div
              :class="[
                setTimeThread == 90
                  ? 'center-time__object select'
                  : 'center-time__object',
                userInfo?.balance_usdt >= 4000 ? '' : 'order_command_disable',
              ]"
              @click="setTime(90)"
            >
              <i class="bx bxs-lock-alt" style="color: rgb(250, 250, 250)"></i>
              90 <span>{{ languagePack.market_index_title7 }}</span>
            </div>
            <div
              :class="[
                setTimeThread == 180
                  ? 'center-time__object select'
                  : 'center-time__object',
                userInfo?.balance_usdt >= 40000 ? '' : 'order_command_disable',
              ]"
              @click="setTime(180)"
            >
              <i class="bx bxs-lock-alt" style="color: rgb(250, 250, 250)"></i>
              180 <span>{{ languagePack.market_index_title7 }}</span>
            </div>
            <div
              :class="[
                setTimeThread == 300
                  ? 'center-time__object select'
                  : 'center-time__object',
                userInfo?.balance_usdt >= 100000 ? '' : 'order_command_disable',
              ]"
              @click="setTime(300)"
            >
              <i class="bx bxs-lock-alt" style="color: rgb(250, 250, 250)"></i>
              300 <span>{{ languagePack.market_index_title7 }}</span>
            </div>
          </div>
        </div>
        <div class="center-mass">
          <div class="center-mass__title">
            <h4>{{ languagePack.market_index_title8 }}</h4>
          </div>
          <div class="center-mass__body">
            <div
              :class="[
                setMassDolar == 100
                  ? 'center-mass__object select'
                  : 'center-mass__object',
              ]"
              @click="setMass(100)"
            >
              $100
            </div>
            <div
              :class="[
                setMassDolar == 500
                  ? 'center-mass__object select'
                  : 'center-mass__object',
              ]"
              @click="setMass(500)"
            >
              $500
            </div>
            <div
              :class="[
                setMassDolar == 1000
                  ? 'center-mass__object select'
                  : 'center-mass__object',
              ]"
              @click="setMass(1000)"
            >
              $1.000
            </div>
            <div
              :class="[
                setMassDolar != 100 &&
                setMassDolar != 500 &&
                setMassDolar != 1000
                  ? 'center-mass__object select'
                  : 'center-mass__object',
              ]"
              @click="setMass('')"
            >
              {{ languagePack.market_index_title9 }}
            </div>
          </div>
          <div class="center-mass__body">
            <input
              @change="setMass(setMassDolar)"
              placeholder="Enter USDT amount"
              v-model="setMassDolar"
              type="number"
              class="center-mass__input"
              max="10000000"
            />
          </div>
        </div>
        <div class="center-confirm" style="margin-bottom: 50px">
          <button
            class="buycf"
            :class="typeCommand == 'long' ? 'long' : 'short'"
            @click="buyForex()"
          >
            {{ typeCommand == 'long' ? languagePack.market_index_title4 : languagePack.market_index_title5 }} {{ languagePack.market_index_title10 }}
          </button>
        </div>
      </div>
      <div class="popbuy-top" v-if="showPopCircle">
        <div class="ct">
          <PopCircle :second="setTimeThread" :name="selectCoinValue.symbol" />
          <div class="info">
            <div class="info-title">{{ languagePack.market_index_title11 }}</div>
            <div class="info-content flex">
              <div class="info-content__item">
                <div class="info-content__item__title">{{ languagePack.market_index_title12 }}</div>
                <div
                  class="info-content__item__data"
                  :class="typeCommand == 'long' ? `success` : `error`"
                >
                  {{ typeCommand == 'long' ? languagePack.market_index_title4 : languagePack.market_index_title5 }}
                </div>
              </div>
              <div class="info-content__item">
                <div class="info-content__item__title">{{ languagePack.market_index_title13 }}</div>
                <div class="info-content__item__data">
                  {{ setMassDolar }} USDT
                </div>
              </div>
              <div class="info-content__item">
                <div class="info-content__item__title">{{ languagePack.market_index_title14 }}</div>
                <div
                  :class="[
                    setPercent > 0
                      ? 'info-content__item__data success'
                      : 'info-content__item__data error',
                  ]"
                >
                  {{ setPercent }}%
                </div>
              </div>
            </div>
            <div class="info-mass flex">
              <div class="info-mass__name">
                {{ languagePack.market_index_title15 }}:
                <span style="text-transform: uppercase"
                  >{{ selectCoinValue }}usdt</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <Result
        :data="resultData"
        v-if="showResult"
        @close-popup="showResult = false"
      />
      <!--=================Buy=========== -->
    </div>
    <div class="market" v-if="tab == 2">
      <div
        class="update-time"
        style="
          text-align: right;
          color: #a0a0a2;
          font-size: 12px;
          margin-bottom: 10px;
        "
      >
        {{ languagePack.market_index_title16 }}: {{ changeDate(crypto[1].updatedAt) }}
      </div>
      <div class="head">
        <div class="left">
          <div class="name">{{ languagePack.market_index_title17 }}</div>
        </div>
        <div class="center">
          <div class="price">{{ languagePack.market_index_title18 }}</div>
        </div>
        <div class="right">
          <div class="price">{{ languagePack.market_index_title19 }}(%24h)</div>
        </div>
      </div>
      <div
        class="item"
        v-for="item in crypto"
        :key="item.id"
        @click="selectCoinMarket(item)"
      >
        <div class="left">
          <div class="name">{{ item.symbol }}usdt</div>
          <div class="cap">{{ formatCap(item.market_cap) }} USDT</div>
        </div>
        <div class="center">
          <div class="price">{{ formatCurentPrice(item.current_price) }}</div>
        </div>
        <div class="right">
          <div
            class="price"
            :class="
              parseFloat(item.price_change_percentage_24h) < 0 ? 'down' : 'up'
            "
          >
            {{
              parseFloat(item.price_change_percentage_24h) < 0
                ? formatNumber2(item.price_change_percentage_24h)
                : '+' + formatNumber2(item.price_change_percentage_24h)
            }}%
          </div>
        </div>
      </div>
    </div>
    <HandleNoti v-if="showErrNoti" :noti="errNoti"/>
  </div>
</template>

<style scoped>
/* --------------------transaction----------------------- */
.err_time {
  font-size: 12px;
  color: #f14545;
}

.more {
  display: inline-block;
  margin-left: 5px;
}

.more i {
  font-size: 23px;
  display: block;
  font-weight: 700;
  color: #5773ff;
  padding: 0;
}

.popbuy-content {
  padding-inline: 12px;
}

.wallet {
  padding: 5px 0;
  display: flex;
  align-items: center;
}

.wallet span {
  font-weight: 600;
}

.wallet .kd {
  color: #a0a0a2;
  font-size: 13px;
}

.wallet .sd {
  display: inline-block;
  margin-left: 7px;
}

.btns {
  display: inline-block;
  width: 35%;
  text-align: center;
  height: 33px;
  border-radius: 16.5px;
  line-height: 33px;
  background-color: var(--background-input);
  color: #a0a0a2;
  font-weight: 700;
}

.btn-active {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.btn-active .long {
  margin-right: 30px;
}

.btn-active .l {
  color: #fff;
  background-color: #24af6c;
}

.btn-active .s {
  color: #fff;
  background-color: #f14545;
}

.errCommon {
  color: #f14545;
  font-size: 12px;
  display: block;
  text-align: center;
}

.buy h4 {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #a0a0a2;
}

.center-confirm {
  margin-top: 30px;
  text-align: center;
}

.center-confirm button {
  border-radius: 5px;
  color: #fff;
  border: none;
  height: 35px;
  line-height: 35px;
  font-weight: 700;
  width: 40%;
  border-radius: 16.5px;
  font-size: 14px;
}

.center-confirm .long {
  background: #24af6c;
}

.center-confirm .short {
  background-color: #f14545;
}

/*  */
.popbuy-center {
  min-height: 150px;
  font-size: 14px;
}

.flex {
  display: flex;
}

.center-time {
  text-align: start;
  margin-top: 5px;
}

.center-time__body {
  display: flex;
  flex-wrap: wrap;
}

.center-time__object {
  border: 1px solid #282b30;
  height: 35px;
  line-height: 35px;
  border-radius: 16.5px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-weight: 600;
  padding-inline: 10px;
  text-align: center;
  margin-bottom: 10px;
}

.select {
  background: #282b30;
}

.center-mass {
  text-align: start;
  margin-top: 10px;
}

.center-mass__body {
  display: flex;
  margin-top: 7px;
  margin-bottom: 3px;
}

.center-mass__body input {
  width: 100%;
  height: 37px;
  border-radius: 18.5px;
  background-color: #282b30;
  font-size: 15px;
  font-weight: 600;
  padding-inline: 15px;
  color: #fff;
}

.center-mass__title {
  margin-bottom: 5px;
}

.center-mass__object {
  padding: 5px 15px;
  border: 1px solid var(--background-input);
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-weight: 600;
  border-radius: 16.5px;
  border: 1px solid #282b30;
}

.center-mass__input {
  border: none;
  padding: 5px 10px;
  background: #414954;
  width: 70%;
  outline: none;
  color: #dfdfdf;
}

.center-balence {
  text-align: start;
  margin: 15px 0px;
}

.popbuy-bottom {
  font-size: 13px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.popbuy-bottom__label {
  width: 50%;
  text-align: center;
}

.info {
  margin-top: 20px;
}

.info-content {
  margin-top: 20px;
}

.info-content__item {
  width: 33%;
  text-align: center;
}

.info-content__item div {
  line-height: 30px;
  font-weight: 500;
}

.info-mass {
  justify-content: center;
}

.info-mass__name {
  display: block;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
}

.success {
  color: #16ba0c;
}

.error {
  color: #da2828;
}

.center-time__object i {
  display: none;
}

.order_command_disable {
  border-color: #333333;
  background-color: #333333;
  opacity: 0.5;
  position: relative;
}

.order_command_disable i {
  display: block;
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 9;
}

.popbuy-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999999;
}

.popbuy-top .ct {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 90%;
  background: #282b30;
  border-radius: 10px;
  padding: 30px 20px;
  color: #fff;
  box-shadow: 0 0 1px 1px #282b30;
}

.info-title {
  text-align: center;
  font-weight: 500;
}

.popbuy-top > i {
  position: absolute;
  right: 10px;
  top: 10px;
}

/*  */
.transaction .buy {
  margin-top: 20px;
  font-weight: 600;
}

.buy .balance {
  margin-bottom: 10px;
}

.transaction .buy .balance span {
  color: #a0a0a2;
}

.btn-active {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.btn-active .long {
  margin-right: 30px;
}

.btn-active .l {
  color: #fff;
  background-color: #24af6c;
}

.btn-active .s {
  color: #fff;
  background-color: #f14545;
}

.btns {
  display: inline-block;
  width: 35%;
  text-align: center;
  height: 33px;
  border-radius: 16.5px;
  line-height: 33px;
  background-color: #282b30;
  color: #fff;
  font-weight: 700;
}

select {
  height: 30px;
  background: none;
  outline: none;
  appearance: none;
  letter-spacing: 0.8px;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

/* ---------------------------------------------- */

.top-control {
  position: relative;
  min-height: 30px;
}

.top-control .ct {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: #282b30;
  border-radius: 15px;
  padding: 3px;
  color: #a0a0a2;
}

.top-control .ct .item {
  padding: 3px 10px;
}

.active {
  background: #1c1f24;
  border-radius: 15px;
  color: #fff;
}

.top-control .ct .item:first-child {
  margin-right: 10px;
}

/* transaction */
.transaction {
  margin-top: 20px;
}

.transaction .top {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

#tradingview {
  height: 400px;
}

/* .market */
.market {
  margin-top: 20px;
}

.market .head {
  font-size: 12px;
  color: #a0a0a2;
}

.market .item,
.market .head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.market .item .left,
.market .head .left {
  text-align: left;
  width: 25%;
}

.market .item .left .name {
  text-transform: uppercase;
  font-weight: 600;
}

.market .item .left .cap {
  color: #a0a0a2;
  font-size: 12px;
}

.market .item .center,
.market .head .center {
  text-align: right;
  width: 45%;
}

.market .item .center {
  font-weight: 600;
}

.market .item .right,
.market .head .right {
  text-align: right;
  width: 20%;
}

.market .item .right .price.up {
  text-align: center;
  background: #24af6c;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
}

.market .item .right .price.down {
  text-align: center;
  background: #f14545;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 10px;
}

.upp {
  color: #24af6c;
  background-color: #21332a;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 13px;
}

.downn {
  color: #f14545;
  background-color: #3f2424;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 13px;
}
</style>
