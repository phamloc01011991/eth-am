<script setup>
import { languagePack } from '../languages'
import { formatNumber2 } from '../utils/formatCoin.js';
const emit = defineEmits(['close-popup']);
const props = defineProps({
    configInterest: Array,
    hour_mining: Number
})
const closePopup = () => {
  emit('close-popup')
}
</script>

<template>
  <div id="home-classification">
    <div class="top">
        <h2>{{ languagePack.home_classification_title }}</h2>
        <div class="note">{{ languagePack.home_classification_title1 }} {{ hour_mining }} {{ languagePack.home_classification_title2 }}</div>
    </div>
    <div class="list">
        <div class="item head">
            <div class="left">
                {{ languagePack.home_classification_level }}
            </div>
            <div class="center">
                USDT
            </div>
            <div class="right">
                {{ languagePack.home_classification_income }} (%)
            </div>
        </div>
        <div class="item" v-for="item in configInterest" :key="item.id">
            <div class="left">
                {{ languagePack.home_classification_level1 }} {{ item.level }}
            </div>
            <div class="center">
                {{ formatNumber2(item.valueMin) }} - {{ formatNumber2(item.valueMax) }}
            </div>
            <div class="right">
                {{ formatNumber2(item.percentMin) }}% - {{ formatNumber2(item.percentMax) }}%
            </div>
        </div>
    </div>
    <div class="btn-center">
        <button class="swap" @click="closePopup">{{ languagePack.home_classification_gotit }}</button>
    </div>
  </div>
  
</template>

<style scoped>
    #home-classification {
        position: fixed;
        width: 100%;
        min-height: 100vh;
        top: 0;
        left: 0;
        background: #181818;
        padding: 45px 15px 85px 15px;
        z-index: 99999999;
    }
    .top h2 {
       margin-bottom: 15px;
    }
    .top {
        margin-bottom: 20px;
    }
    .head {
        color: #a0a0a2;
        font-weight: 600;
    }
    .list .item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .list .item .left {
        width: 20%;
        text-align: left;
    }
    .list .item .center {
        width: 50%;
        text-align: center;
    }
    .list .item .right {
        width: 30%;
        text-align: right;
    }
    .btn-center {
        margin-top: 30px;
    }
    .btn-center .swap {
        width: 100%;
        padding-block: 15px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 20px;
        border: none;
        color: #fff;
        cursor: pointer;
        background: #5773ff;
    }
</style>