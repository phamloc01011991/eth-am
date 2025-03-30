<script setup>
import { languagePack } from '../../languages'
import { onMounted, ref, watch } from 'vue';
import { formatNumber2, formatNumber4, formatNumber6, formatNumber10 } from '../../utils/formatCoin.js'
import request from '../../utils/request.js'
import SwapsReview from '../../components/SwapsReview.vue'

const userInfo = ref();
const usdt = ref();
const eth = ref();
const vndc = ref()

const ETHConvert = ref(true);
const isDisplaySwapsReview = ref(false);



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
    amount.value = 0;
}



async function getEthInfo() {
    var res = await request.get('crypto/ethereum');
    eth.value = res.data.data;
}
async function getUsdtInfo() {
    var res = await request.get('crypto/tether');
    usdt.value = res.data.data;
}
async function getVndcInfo() {
    var res = await request.get('crypto/vndc');
    vndc.value = res.data.data;
}

// new
const fromCrypto = ref('ETH');
const toCrypto = ref('USDT');
const receiveAmount = ref('0');
const amount = ref('');
// Crypto data
const cryptoData = {
    ETH: {
        name: 'ETH'
    },
    USDT: {
        name: 'USDT'
    },
    VNDC: {
        name: 'VNDC'
    }
};
// Exchange rates
let exchangeRates;
// Methods
const handleSwap = () => {
    const temp = fromCrypto.value;
    fromCrypto.value = toCrypto.value;
    toCrypto.value = temp;
    amount.value = '';
    receiveAmount.value = '0';
};

const handleMaxAmount = () => {
    if (fromCrypto.value == 'ETH') {
        amount.value = userInfo.value.balance_eth
    } else if (fromCrypto.value == 'USDT') {
        amount.value = userInfo.value.balance_usdt
    } else {
        amount.value = userInfo.value.balance_vndc
    }
    handleAmountChange()
};

const handleAmountChange = () => {
    if (amount.value && !isNaN(parseFloat(amount.value))) {
        const convertedAmount = parseFloat(amount.value) * exchangeRates[fromCrypto.value][toCrypto.value];
        receiveAmount.value = (convertedAmount);
    } else {
        receiveAmount.value = '0';
    }
};

// Watch for changes in from/to crypto to update the conversion
watch([fromCrypto, toCrypto, amount], () => {
    handleAmountChange();
});

onMounted(async () => {
    loadCheck();
    await getEthInfo();
    await getUsdtInfo();
    await getVndcInfo();
    exchangeRates = {
        ETH: {
            USDT: parseFloat(eth.value.current_price),
            VNDC: parseFloat(eth.value.current_price) / parseFloat(vndc.value.current_price),
            ETH: 1
        },
        USDT: {
            ETH: 1 / parseFloat(eth.value.current_price),
            VNDC: 1 / parseFloat(vndc.value.current_price),
            USDT: 1
        },
        VNDC: {
            ETH: 1 / (parseFloat(eth.value.current_price) / parseFloat(vndc.value.current_price)),
            USDT: parseFloat(vndc.value.current_price),
            VNDC: 1
        }
    };
    console.log(exchangeRates);
})
</script>

<template>
    <div id="wrapper">
        <div id="swaps">
            <div class="select-coin">
                <div class="coin">
                    <div class="img">
                        <img v-if="fromCrypto == 'ETH'" src="../../assets/eth.png" height="35" alt="">
                        <img v-if="fromCrypto == 'USDT'" src="../../assets/usdt.png" height="35" alt="">
                        <img v-if="fromCrypto == 'VNDC'" src="../../assets/vndc.png" height="35" alt="">
                    </div>
                    <div class="ct">
                        <div class="top">{{ languagePack.swap_index_title1 }}</div>
                        <select v-model="fromCrypto">
                            <option v-for="crypto in Object.keys(cryptoData)" :key="crypto" :value="crypto"
                                :disabled="crypto === toCrypto">
                                {{ crypto }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="center">
                    <button @click="handleSwap">
                        <img src="../../assets/right-arrow.png" width="25" alt="">
                    </button>
                </div>
                <div class="coin">
                    <div class="img">
                        <img v-if="toCrypto == 'ETH'" src="../../assets/eth.png" height="35" alt="">
                        <img v-if="toCrypto == 'USDT'" src="../../assets/usdt.png" height="35" alt="">
                        <img v-if="toCrypto == 'VNDC'" src="../../assets/vndc.png" height="35" alt="">
                    </div>
                    <div class="ct">
                        <div class="top">{{ languagePack.swap_index_title2 }}</div>
                        <select v-model="toCrypto">
                            <option v-for="crypto in Object.keys(cryptoData)" :key="crypto" :value="crypto"
                                :disabled="crypto === fromCrypto">
                                {{ crypto }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="balance-swaps">
                <div class="balance">
                    <input type="number" v-model="amount" placeholder="0">
                </div>
                <div class="bottom">
                    <div class="note">
                        {{ userInfo ? (fromCrypto == 'ETH' ? formatNumber6(parseFloat(userInfo.balance_eth)) : (fromCrypto
                            == 'USDT' ? formatNumber2(parseFloat(userInfo.balance_usdt))
                            : formatNumber2(parseFloat(userInfo.balance_vndc)))) : 0 }}
                        {{ fromCrypto == 'ETH' ? 'ETH' : (fromCrypto == 'USDT' ? 'USDT' : 'VNDC') }}
                        {{ languagePack.swap_index_title3 }}
                    </div>
                    <div class="btn">
                        <button>USDT</button>
                        <button @click="handleMaxAmount()">{{ languagePack.swap_index_title4 }}</button>
                    </div>
                </div>
            </div>
            <div class="reviews">
                <div class="item">
                    <div class="right">
                        {{ languagePack.swap_index_title5 }}
                    </div>
                    <div class="left">
                        {{ receiveAmount }} {{ toCrypto }}
                    </div>
                </div>
                <div class="item">
                    <div class="right">
                        {{ languagePack.swap_index_title6 }}
                    </div>

                    <div class="left">
                        1 {{ fromCrypto }} = {{ exchangeRates ? (exchangeRates[fromCrypto][toCrypto]) : 0
                        }} {{
    toCrypto }}
                    </div>
                </div>
            </div>
            <div class="button-review">
                <button @click="isDisplaySwapsReview = true"
                    :class="userInfo ? (fromCrypto == 'ETH' && userInfo.balance_eth >= amount && amount > 0 ? 'active' : (fromCrypto == 'USDT' && userInfo.balance_usdt >= amount && amount > 0) ? 'active' : (fromCrypto == 'VNDC' && userInfo.balance_vndc >= amount && amount > 0) ? 'active' : '') : ''"
                    :disabled="userInfo ? (fromCrypto == 'ETH' && userInfo.balance_eth >= amount && amount > 0 ? false : (fromCrypto == 'USDT' && userInfo.balance_usdt >= amount && amount > 0) ? false : (fromCrypto == 'VNDC' && userInfo.balance_vndc >= amount && amount > 0) ? false : true) : true">{{
                        languagePack.swap_index_title7 }}</button>
            </div>
        </div>
        <SwapsReview v-if="isDisplaySwapsReview" :fromCrypto="fromCrypto" :toCrypto="toCrypto" :amount="amount"
            :receiveAmount="receiveAmount" :address="userInfo.address" :exchangeRates="exchangeRates"
            @close-popup="isDisplaySwapsReview = false" @resetSwaps="resetSwaps()" />
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

.select-coin .ct select {
    background: none;
    outline: none;
    border: none;
    color: #fff;
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