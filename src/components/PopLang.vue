<script setup>
import { onMounted, ref } from 'vue'
const emit = defineEmits(['close-popup'])
import { languagePack, setLanguage } from '../languages';
let locations = JSON.parse(localStorage.getItem('locations'))
const closePopup = () => {
    emit('close-popup')
}
onMounted(() => {

})
</script>

<template>
    <div class="select-lang">
        <div class="top">
            <div class="ct">
                <div class="back"><i class='bx bx-left-arrow-alt' @click="closePopup"></i></div>
                <h4>{{ languagePack.lang_tilte }}</h4>
            </div>
        </div>
        <div class="lang">
            <h5>{{ languagePack.lang_title1 }}</h5>
            
            <div class="lang-item" @click="setLanguage('EN')">
                <div class="left">
                    <span>{{ languagePack.lang_english }}</span>
                </div>
                <i v-if="locations.language == 'EN'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('TAYBANNHA')">
                <div class="left">
                    <span>{{ languagePack.lang_espanol }}</span>
                </div>
                <i v-if="locations.language == 'TAYBANNHA'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('INDO')">
                <div class="left">
                    <span>{{ languagePack.lang_indonesian }}</span>
                </div>
                <i v-if="locations.language == 'INDO'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('NGA')">
                <div class="left">
                    <span>{{ languagePack.lang_nga }}</span>
                </div>
                <i v-if="locations.language == 'NGA'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('CHINA')">
                <div class="left">
                    <span>{{ languagePack.lang_cn }}</span>
                </div>
                <i v-if="locations.language == 'CHINA'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('BODAONHA')">
                <div class="left">
                    <span>{{ languagePack.lang_bodaonha }}</span>
                </div>
                <i v-if="locations.language == 'BODAONHA'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('ITALI')">
                <div class="left">
                    <span>{{ languagePack.lang_italia }}</span>
                </div>
                <i v-if="locations.language == 'ITALI'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('PHAP')">
                <div class="left">
                    <span>{{ languagePack.lang_phap }}</span>
                </div>
                <i v-if="locations.language == 'PHAP'" class='bx bx-check-circle'></i>
            </div>
            <div class="lang-item" @click="setLanguage('VN')">
                <div class="left">
                    <span>{{ languagePack.lang_vn }}</span>
                </div>
                <i v-if="locations.language == 'VN'" class='bx bx-check-circle'></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.select-lang {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  z-index: 99999;
  overflow-y: scroll;
  background: #181818;
  overflow-x: hidden;
  z-index: 99999999999;
  max-width: 1280px;
  padding: 45px 15px 85px 15px;
  min-height: 100vh;
  margin: 0 auto;
}
.top {
  background: #181818;
}

.top .ct {
  position: relative;
}
.top .ct h4 {
  font-weight: 600;
  font-size: 17px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.top .back {
  font-size: 25px;
}
.lang {
  padding: 20px 12px
}
.lang h5 {
  font-size: 15px;
  margin-bottom: 15px;
  font-weight: 700;
}
.lang-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #3d3d3d;
  font-weight: 700;
}
.lang-item .left {
  display: flex;
  align-items: center;
}
.lang-item .left span {
  display: inline-block;
  margin-left: 10px;
  padding-block: 15px;
}
.lang-item i {
  display: inline-block;
  color: #24af6c;
  font-size: 20px;

}
</style>