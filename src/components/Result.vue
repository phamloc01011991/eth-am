<script setup>
import { onMounted, ref, reactive, defineProps } from 'vue'
import { languagePack } from '../languages'
import request from '../utils/request'
import { formatNumber2, formatNumber4, formatNumber6 } from '../utils/formatCoin.js'
let resultData = reactive({})
const resultWin = ref(true)
const emit = defineEmits(['close-popup'])
const closePopup = () => {
  emit('close-popup')
}
const props = defineProps({
  data: Object
})

const setInfo = ref('')


async function loadCheck() {
    let user = localStorage.getItem('user')
    if (typeof user == 'string') {
        request.get('user/getUser', {
            params: {
                address: user
            }
        })
            .then((user) => {
                setInfo.value = user.data.data
                console.log(setInfo.value);
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        console.log('not user in localstorage');
    }
}

onMounted(async () => {
  loadCheck()

  setTimeout(() => {
    closePopup()
  }, 2000000)
  resultWin.value = props.data.win
})
</script>

<template>
  <div class="popbuy" :data-theme="theme">
    <div class="popbuy-content">
      <div class="popbuy-center">
        <div class="neon" v-if="resultWin">{{ languagePack.result_win }}</div>
        <div class="flux" v-else>{{ languagePack.result_lose }}</div>
        <div class="content">
          <div class="kq-detail flex" >
            <div class="kq_detail left">
              <div class="t" :class="[props.data.type == 'long' ? 'success' : 'error']">
                {{ props.data.type == 'long' ? languagePack.result_buy : languagePack.result_sell }} 
              </div>
            </div>
            <div class="kq_detail center">
              <div class="t">
                <span style="text-transform: uppercase;">{{ props.data.product }}/usdt</span>
              </div>
            </div>
            <div class="kq_detail right">
              <div class="t" :class="[resultWin ? 'success' : 'error']" v-if="typeof props.data.amount == 'undefined'">...</div>
              <div class="t" :class="[resultWin ? 'success' : 'error']" v-else>
                {{
                  resultWin
                    ? formatNumber2(props.data.percent_money)
                    : '-' + formatNumber2(props.data.amount)
                }} USDT
              </div>
            </div>
          </div>
          <div class="inout">
            <div class="note">
                {{ languagePack.result_avai }}:
              {{ typeof setInfo.balance_usdt == 'undefined' ? '...' : formatNumber2(setInfo.balance_usdt) }} USDT
            </div>
          </div>
          <div class="closeBottom">
            <button class="center-balence__btn btns" @click="closePopup()">
                {{ languagePack.result_confirm }}
            </button>
          </div>
          <RouterLink class="golsgd" to="/history">{{ languagePack.result_order_his }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.golsgd {
  font-weight: 500;
  color: #24af6c;
}
.t {
  font-weight: 500;
  font-size: 14px;
}
.note {
  font-size: 14px;
  font-weight: 500;
  margin-top: 20px;
}
.center-balence__btn.btns {
  font-weight: 600;
}
.success {
  color: #24af6c;
}
.error {
  color: #f14545;
}
.closeBottom {
  margin: 40px 0px 15px 0;
}
.inout {
  margin-top: 10px;
}
.flex {
  display: flex;
}
.kq {
  padding-bottom: 15px;
}
.kq_detail {
  width: calc(100% / 3);
}
.popbuy {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999999;
}
.popbuy-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 90%;
  background: #282b30;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 0 0 1px 1px #282b30;
  text-align: center;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: table;
}

@font-face {
  font-family: neon;
}

.container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.neon {
  font-family: neon;
  color: #f14545;
  /* font-size: 15vw; */
  font-size: 60px;
  line-height: 80px;
  margin-bottom: 5px;
  text-shadow: 0 0 3vw #f14545;
  text-transform: uppercase;
}

.flux {
  font-family: neon;
  color: #426dfb;
  /* font-size: 15vw; */
  font-size: 55px;
  line-height: 80px;
  text-shadow: 0 0 3vw #2356ff;
  margin-bottom: 18px;
}

.neon {
  animation: neon 1s ease infinite;
  -moz-animation: neon 1s ease infinite;
  -webkit-animation: neon 1s ease infinite;
}

.flux {
  animation: flux 2s linear infinite;
  -moz-animation: flux 2s linear infinite;
  -webkit-animation: flux 2s linear infinite;
  -o-animation: flux 2s linear infinite;
}
@keyframes neon {
  0%,
  100% {
    text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16, 0 0 10vw #fa1c16,
      0 0 0.4vw #fed128, 0.5vw 0.5vw 0.1vw #806914;
    color: #fed128;
  }
  50% {
    text-shadow: 0 0 0.5vw #800e0b, 0 0 1.5vw #800e0b, 0 0 5vw #800e0b, 0 0 5vw #800e0b,
      0 0 0.2vw #800e0b, 0.5vw 0.5vw 0.1vw #40340a;
    color: #f4a2a2;
  }
}

@keyframes flux {
  0%,
  100% {
    text-shadow: 0 0 1vw #7d97ff, 0 0 3vw #1041ff, 0 0 10vw #1041ff, 0 0 10vw #1041ff,
      0 0 0.4vw #8bfdfe, 0.5vw 0.5vw 0.1vw #147280;
    color: #a57ee9;
  }
  50% {
    text-shadow: 0 0 0.5vw #2145d8, 0 0 1.5vw #94a8f9, 0 0 5vw #082180, 0 0 5vw #082180,
      0 0 0.2vw #082180, 0.5vw 0.5vw 0.1vw #0a3940;
    color: #146c80;
  }
}

.btns {
  padding: 7px 30px;
  border: none;
  border-radius: 5px;
  background: #5773ff;
  color: #fff;
  border: 1px solid #5773ff;
}

@media (min-width: 1024px) {
  @keyframes neon {
    0%, 100% {
      text-shadow: 0 0 0.45vw #fa1c16, 0 0 1.35vw #fa1c16, 0 0 4.5vw #fa1c16, 0 0 4.5vw #fa1c16,
                   0 0 0.18vw #fed128, 0.225vw 0.225vw 0.045vw #806914;
      color: #fed128;
    }
    50% {
      text-shadow: 0 0 0.225vw #800e0b, 0 0 0.675vw #800e0b, 0 0 2.25vw #800e0b, 0 0 2.25vw #800e0b,
                   0 0 0.09vw #800e0b, 0.225vw 0.225vw 0.045vw #40340a;
      color: #f4a2a2;
    }
  }

  @keyframes flux {
    0%, 100% {
      text-shadow: 0 0 0.45vw #7d97ff, 0 0 1.35vw #1041ff, 0 0 4.5vw #1041ff, 0 0 4.5vw #1041ff,
                   0 0 0.18vw #8bfdfe, 0.225vw 0.225vw 0.045vw #147280;
      color: #a57ee9;
    }
    50% {
      text-shadow: 0 0 0.225vw #2145d8, 0 0 0.675vw #94a8f9, 0 0 2.25vw #082180, 0 0 2.25vw #082180,
                   0 0 0.09vw #082180, 0.225vw 0.225vw 0.045vw #0a3940;
      color: #146c80;
    }
  }
}

@media (min-width: 600) {
  @keyframes neon {
    0%, 100% {
      text-shadow: 0 0 0.75vw #fa1c16, 0 0 2.25vw #fa1c16, 0 0 7.5vw #fa1c16, 0 0 7.5vw #fa1c16,
                   0 0 0.3vw #fed128, 0.375vw 0.375vw 0.075vw #806914;
      color: #fed128;
    }
    50% {
      text-shadow: 0 0 0.375vw #800e0b, 0 0 1.125vw #800e0b, 0 0 3.75vw #800e0b, 0 0 3.75vw #800e0b,
                   0 0 0.15vw #800e0b, 0.375vw 0.375vw 0.075vw #40340a;
      color: #f4a2a2;
    }
  }

  @keyframes flux {
    0%, 100% {
      text-shadow: 0 0 0.75vw #7d97ff, 0 0 2.25vw #1041ff, 0 0 7.5vw #1041ff, 0 0 7.5vw #1041ff,
                   0 0 0.3vw #8bfdfe, 0.375vw 0.375vw 0.075vw #147280;
      color: #a57ee9;
    }
    50% {
      text-shadow: 0 0 0.375vw #2145d8, 0 0 1.125vw #94a8f9, 0 0 3.75vw #082180, 0 0 3.75vw #082180,
                   0 0 0.15vw #082180, 0.375vw 0.375vw 0.075vw #0a3940;
      color: #146c80;
    }
  }
}
</style>
