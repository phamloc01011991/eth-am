<script setup>
import { languagePack } from '../languages'
import { defineProps, ref } from 'vue';
import {
  formatNumber2,
  formatNumber4,
  formatNumber6,
} from '../utils/formatCoin.js';
const props = defineProps({
  name: String,
  input: String,
  output: String,
  profit:String,
  order_type:String,
  order_result:String,
  amount: String,
  time: String,
  id: String,
  order_duration: String,
  profit_percentage: String
});

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
</script>

<template>
    <div class="table_row ">
        <div class="top">
            <div class="left">
               <span class="name" style="text-transform: uppercase;">
                    {{ name }}usdt
               </span>
               <span class="type" :class="[ order_type == 'long' ? 'win' : 'lose' ]">
                 {{ order_type == 'long' ? 'Buy' : 'Sell' }}
               </span>
            </div>
            <span class="right">
                {{ languagePack.table_item_status }}
            </span>
        </div>
        <div class="sub">
            <div class="left">
                <span class="title">{{ languagePack.table_item_title1 }}</span>
                <span>174800{{id}}</span>
            </div>
            <div class="right">
                <span class="title">{{ languagePack.table_item_title2 }}</span>
                <span>{{ changeDate(time) }}</span>
            </div>
        </div>
        <div class="ct">
            <div class="item">
                <span class="left">
                    {{ languagePack.table_item_title3 }} USDT
                </span>
                <span class="right">
                    {{ formatNumber2(amount) }} USDT
                </span>
            </div>
            <div class="item">
                <span class="left">
                    {{ languagePack.table_item_title4 }}
                </span>
                <span class="right">
                    {{ order_duration }}
                </span>
            </div>
            <div class="item">
                <span class="left">
                    {{ languagePack.table_item_title5 }} (%)
                </span>
                <span class="right">
                    {{ profit_percentage }}%
                </span>
            </div>
            <div class="item">
                <span class="left">
                    {{ languagePack.table_item_title6 }}
                </span>
                <span class="right">
                    {{ formatNumber2(input) }}
                </span>
            </div>
            <div class="item">
                <span class="left">
                    {{ languagePack.table_item_title7 }}
                </span>
                <span class="right">
                    {{ formatNumber2(output) }}
                </span>
            </div>
        </div>
        <div class="bottom">
            <span class="left">
                {{ languagePack.table_item_title8 }}
            </span>
            <span class="right" :class="[ order_result == 'win' ? 'win' : 'lose' ]">
                {{ order_result == "win" ? '+' + formatNumber2(profit)+'$' : '-'+ formatNumber2(amount)+'$' }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.lose {
    color: #f14545;
}
.win {
    color: #24af6c;
}

.table_row {
    background-color: #282b30;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.244);
}
.top .left span{
    display: block;
}
.top .left .name {
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 1px;
}
.top .left .type {
    font-weight: 500;
}
.top .right{
    color: #24af6c;
    background-color: #282b30;
    height: 30px;
    line-height: 30px;
    padding-inline: 10px;
    border-radius: 15px;
    font-weight: 500;
}
.sub {
    padding-block: 5px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.244);
    font-size: 12px;
    display: flex;
}
.sub span {
    display: block;
}
.sub .left {
    margin-right: 30px;
}
.sub span {
    font-size: 12px;
    font-weight: 500;
}
.sub .title {
    color: #99999b;
}
.ct {
    padding-block: 5px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.244);
}
.ct .item {
    display: flex;
    justify-content: space-between;
}
.ct .item .left, .bottom .left {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-sub-color);
}
.ct .item .right {
    font-weight: 500;
}
.bottom {
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
}
.bottom .right {
    font-weight: 500;
}
</style>