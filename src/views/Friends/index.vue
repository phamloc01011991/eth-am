<script setup>
import { ref, onMounted } from 'vue';
import {languagePack} from '../../languages'
import { formatNumber2, formatNumber4, formatNumber6 } from '../../utils/formatCoin.js'
import HandleNoti from '../../components/HandleNoti.vue'
const isCopyToClipBoardSucces = ref(false)
import request from '../../utils/request.js'
const listFriends = ref([]);
const adminConfig = ref();
const userInfo = ref();
const copySuccess = {
  text: languagePack.friend_index_copyOk,
  status: 'success'
}
async function getAdminConfig() {
  var res = await request.get('user/config/get_config');
  adminConfig.value = res.data.data;
}

async function loadCheck() {

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
    console.log('not user in localstorage');
  }

}
async function getListFriends() {
  let user = localStorage.getItem('user')
  request.get('user/list_referral', {
    params: {
      address: user
    }
  })
  .then((res)=> {
    listFriends.value = res.data.data;
    console.log(listFriends.value);
  })
  .catch((err)=> {
    console.log(err);
  })
  
}

function formatToken(token) {
  const start = token.slice(0, 4);
  const end = token.slice(-6);
  const formattedToken = `${start}...${end}`;
  return formattedToken;
}
 
async function reloadListFriends() {
  document.getElementsByClassName('reload')[0].style.color = '#a0a0a2';
  getListFriends()
  .then(()=>{
    document.getElementsByClassName('reload')[0].style.color = '#fff';
  })
  .catch((err) => {
    console.log(err);
  })
}

function copyClipboard(textToCopy) {
  if (!navigator.clipboard) {
    console.log('Trình duyệt không hỗ trợ API clipboard.');
  } else {
    // Sao chép nội dung vào bộ nhớ đệm
    navigator.clipboard.writeText(textToCopy).then(function () {
      isCopyToClipBoardSucces.value = true
      setTimeout(() => {
        isCopyToClipBoardSucces.value = false
      }, 3000);
    });
  }
}

onMounted(async () => {
  await loadCheck()
  getListFriends();
  getAdminConfig();
})

</script>

<template>
  <div id="friends">
    <div class="top">
      <h2>{{ languagePack.friend_index_title1 }} !</h2>
      <div class="desc">{{ languagePack.friend_index_title2 }}</div>
    </div>
    <div class="banner">
      <div class="item">
        <div class="left">
          <img src="../../assets/gift-box.png" alt="" width="50">
        </div>
        <div class="right">
          <h4>{{ languagePack.friend_index_title1 }}</h4>
          <div>
            <img src="../../assets/usdt.png" alt="" width="25">
            <span><strong>+{{ adminConfig ? formatNumber2(adminConfig.invited_reward) : 0 }} USDT</strong> {{ languagePack.friend_index_intro }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-friends">
      <div class="title">
        <h3>{{ languagePack.friend_index_title3 }} ({{ listFriends.length }})</h3>
        <i class='bx bx-refresh reload' @click="reloadListFriends"></i>
      </div>
      <div class="none-friends" v-if="listFriends.length == 0">
        {{ languagePack.friend_index_title4 }}
      </div>
      <div class="list" v-else>
        <div class="item" v-for="item in listFriends" :key="item.id">
          <div class="left">
            <div class="avt">
              <img src="../../assets/logo.svg" width="25" alt="">
            </div>
            <div class="inf">
              <div class="adress">{{ formatToken(item.note.address) }}</div>
              <div class="balane-eth">
                <img src="../../assets/eth.png" height="20" alt="">
                <span>{{ item ? formatNumber6(item.balance_eth_referral) : 0 }} ETH</span>
              </div>
            </div>
          </div>
          <div class="right">
            <img src="../../assets/usdt.png" alt="" width="20">
            <span>+{{ formatNumber2(item.amount) }} USDT</span>
          </div>
        </div>
      </div>
    </div>
    <div class="invite-center">
      <button class="btn1" @click="copyClipboard('https://eth-am.net/'+userInfo.referralCode)">{{ languagePack.friend_index_btn }} <i class='bx bx-user-plus'></i></button>
      <button class="btn2" @click="copyClipboard('https://eth-am.net/'+userInfo.referralCode)"><i class='bx bx-copy'></i></button>
    </div>
    <HandleNoti v-if="isCopyToClipBoardSucces" :noti="copySuccess"/>
  </div>
</template>

<style scoped>
.top {
  text-align: center;
}

.top h2 {
  font-size: 27px;
  margin-bottom: 10px;
}

.banner {
  margin-top: 30px;
}

.banner .item {
  display: flex;
  align-items: flex-start;
}

.banner .item .right {
  margin-left: 15px;
}

.banner .item .right h4 {
  font-size: 15px;
}

.banner .item .right>div {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.banner .item .right>div span {
  display: block;
  margin-left: 5px;
}

.banner .item .right>div span strong {
  color: #24af6c;
}

.list-friends {
  margin-top: 20px;
}

.list-friends .title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-friends .title i {
  cursor: pointer;
  font-size: 27px;
}

.list-friends .none-friends {
  margin-top: 10px;
  padding: 15px;
  background: #282b30;
  text-align: center;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  color: #a0a0a2;
}

.invite-center {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invite-center button {
  color: #fff;
  background: #5773ff;
  border: none;
  border-radius: 15px;
  padding-block: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}

.invite-center .btn1 {
  width: 100%;
}

.invite-center .btn1 i {
  font-size: 20px;
  display: block;
  margin-left: 5px;
}

.invite-center .btn2 {
  padding: 12px;
  margin-left: 10px;
}

.invite-center .btn2 i {
  font-size: 20px;
}

.list-friends .list {
  margin-top: 15px;
}

.list-friends .list .item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #282b30;
  padding: 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.list-friends .list .item .left {
  display: flex;
  align-items: center;
}

.list-friends .list .item .left .inf .balane-eth {
  display: flex;
  align-items: center;
  margin-top: 3px;
}

.list-friends .list .item .left .inf .balane-eth img {
  margin-right: 5px;
}

.list-friends .list .item .left .avt {
  background-color: #1c1f24;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.list-friends .list .item .left .avt {
  margin-right: 10px;
}

.list-friends .list .item .right {
  display: flex;
  align-items: center;
}

.list-friends .list .item .right img {
  margin-right: 5px;
}

.list-friends .list .item .right span {
  font-size: 14px;
}
</style>