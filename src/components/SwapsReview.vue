<script setup>
import { languagePack } from '../languages'
import { formatNumber2, formatNumber4, formatNumber6, formatNumber10 } from '../utils/formatCoin.js';
import { ref } from 'vue'
import HandleNoti from './HandleNoti.vue'

import request from '../utils/request.js'
const emit = defineEmits(['close-popup', 'resetSwaps'])
const props = defineProps({
    fromCrypto: String,
    toCrypto: String,
    amount: Number,
    receiveAmount: Number,
    exchangeRates: Object,
    address: String
})
const showErrNoti = ref(false)
const errNoti = {
    text: '',
    status: ''
}


const closePopup = () => {
    emit('close-popup')
}
const resetSwaps = () => {
    emit('resetSwaps')
}

async function convertCoin() {
    document.getElementsByClassName('swap')[0].disabled = true;
    document.getElementsByClassName('swap')[0].textContent = languagePack.swap_review_swaping;
    await request.put('crypto-convert', {
        address: props.address,
        convertFrom: props.fromCrypto.toLowerCase(),
        convertTo: props.toCrypto.toLowerCase(),
        amount: props.amount
    })
        .then((res) => {
            errNoti.text = languagePack.swap_review_err1
            errNoti.status = 'success'
            showErrNoti.value = true
            setTimeout(() => {
                showErrNoti.value = false
                resetSwaps();
                closePopup()
            }, 1500);

        })
        .catch((err) => {
            errNoti.text = languagePack.swap_review_err2
            errNoti.status = 'error'
            showErrNoti.value = true
            setTimeout(() => {
                showErrNoti.value = false
            }, 3000);
        })

}


</script>

<template>
    <div id="swaps-review">
        <div class="ticket">
            <h2>{{ languagePack.swap_review_title1 }}</h2>
            <div class="info">
                <div class="item">
                    <div class="left">{{ languagePack.swap_review_title2 }}</div>
                    <div class="right text-highlight">Ref Finance</div>

                </div>
                <div class="item">
                    <div class="left">{{ languagePack.swap_review_title3 }}</div>
                    <div class="right text-highlight">{{ amount }} {{ fromCrypto }}</div>
                </div>
                <div class="item">
                    <div class="left">{{ languagePack.swap_review_title4 }}</div>
                    <div class="right text-highlight">{{ receiveAmount }} {{ toCrypto }}</div>
                </div>
                <div class="item">
                    <div class="left">{{ languagePack.swap_review_title5 }}</div>
                    <div class="right text-highlight">
                        1 {{ fromCrypto }} = {{ exchangeRates ? exchangeRates[fromCrypto][toCrypto] : 0
                        }} {{ toCrypto }}
                    </div>


                </div>
                <div class="item">
                    <div class="left">{{ languagePack.swap_review_title6 }}</div>
                    <div class="right text-highlight">0 ~ 0.5%</div>
                </div>
            </div>
            <div class="btn-center">
                <button class="swap" @click="convertCoin()">{{ languagePack.swap_review_btn1 }}</button>
                <button class="back" @click="closePopup">{{ languagePack.swap_review_btn2 }}</button>
            </div>
        </div>
        <HandleNoti v-if="showErrNoti" :noti="errNoti" />
    </div>
</template>

<style scoped>
#swaps-review {
    position: fixed;
    width: 100%;
    min-height: 100vh;
    top: 0;
    left: 0;
    background: #181818;
    padding: 45px 15px 85px 15px;
    z-index: 99999999;
}

.ticket h2 {
    font-size: 27px;
    padding-bottom: 5px;
    border-bottom: 1px solid #484848;
    margin-bottom: 15px;
}

.info .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    color: #a0a0a2;
}

.btn-center {
    margin-top: 40px;
}

.btn-center button {
    width: 100%;
    padding-block: 15px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 20px;
    border: none;
    color: #fff;
    cursor: pointer;
}

.btn-center button.swap {
    background: #5773ff;
}

.btn-center button.back {
    background: none;
    border: 1px solid #5773ff;
    margin-top: 10px;
}

.text-highlight {
    color: #fff;
    font-weight: 600;
}
</style>