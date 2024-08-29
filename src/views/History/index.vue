<script setup>
import { ref, onMounted } from 'vue';
import {languagePack} from '../../languages'
import request from '../../utils/request.js'
import tableItem from '../../components/tableItem.vue'
const historys = ref()
const userInfo = ref();
let user = localStorage.getItem('user')
async function loadCheck() {
    
    if (typeof user == 'string') {
        request.get('user/getUser', {
            params: {
                address: user
            }
        })
            .then((user) => {
                userInfo.value = user.data.data
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        console.log('not user in localstorage');
    }
}
async function loadDataHistory() {
    console.log(userInfo?.value);
    await request
        .get('order_history/listing', {
            params: {
                address: user,
                limit: 15,
                page: 0
            }
        })
        .then((res) => {
            var result = res.data
            historys.value = result.result
        })
}

onMounted(async () => {
    await loadCheck()
    await loadDataHistory()
})
</script>

<template>
    <div class="main">
        <div class="main-content">
            <div class="history">
                <div class="history-content">
                    <div class="top">
                        <div class="back">
                            <RouterLink to="/market">
                                <i class='bx bx-left-arrow-alt'
                                    @click="closePopup"></i>
                            </RouterLink>
                        </div>
                        <h4>{{ languagePack.history_index_title }}</h4>
                    </div>
                    <div class="history-content__table">
                        <div v-if="!historys" class="history_non" style="text-align: center; margin-top: 50px;">
                            <img src="../../assets/file.png" alt="">
                            <p style="font-weight: 500; display: block; margin-top: 20px;">{{ languagePack.history_index_title1 }}</p>
                        </div>
                        <tableItem v-for="(item, index) in historys" :amount="item.amount" :key="index"
                            :name="item.name" :input="item.entry_price" :output="item.exit_price"
                            :profit="item.profit.toString()" :order_type="item.order_type"
                            :order_result="item.order_result" :time="item.createdAt" :id="item.id.toString()"
                            :order_duration="item.order_duration.toString()"
                            :profit_percentage="item.profit_percentage.toString()" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>


.top {
    display: flex;
    margin-bottom: 25px;
    position: relative;
}

.top .back {
    font-size: 25px;
}

.top h4 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 17px;
}
</style>