<script setup>


</script>

<template>
  <div class="container">
    <div class="container__elements">
      <div class="pill"><span class="star star1"></span><span class="star star2"></span><span
          class="star star3"></span><span class="star star4"></span><span class="star star5"></span><span
          class="star star6"></span><span class="star star7"></span><span class="star star8"></span><span
          class="star star9"></span><span class="star star10"></span><span class="star star11"></span><span
          class="star star12"></span><span class="star star13"></span><span class="star star14"></span><span
          class="star star15"></span><span class="star star16"></span><span class="star star17"></span><span
          class="star star18"></span><span class="star star19"></span><span class="star star20"></span><span
          class="star star21"></span><span class="star star22"></span><span class="star star23"></span><span
          class="star star24"></span>
        <div class="lanternContainer">
          <div class="lanternX1"><img class="lanternY1" src="../assets/eth.png" /></div>
          <div class="lanternX2"><img class="lanternY2" src="../assets/eth.png" /></div>
          <div class="lanternX3"><img class="lanternY3" src="../assets/eth.png" /></div>
          <div class="lanternX4"><img class="lanternY4" src="../assets/eth.png" /></div>
          <div class="lanternX5"><img class="lanternY5" src="../assets/eth.png" /></div>
          <div class="lanternX6"><img class="lanternY6" src="../assets/eth.png" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pill {
  position: relative;
  width: 160px;
  height: 200px;
  overflow: hidden;
}

.lanternHills {
  position: absolute;
  bottom: -1px;
  width: 225px;
  left: -25px;
}

.star {
  background-color: white;
  position: absolute;
  border-radius: 50%;
}

.star1 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 101px;
  top: 93px;
}

.star2 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 34px;
  top: 175px;
}

.star3 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 165px;
  top: 65px;
}

.star4 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 84px;
  top: 25px;
}

.star5 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 116px;
  top: 205px;
}

.star6 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 13px;
  top: 125px;
}

.star7 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 135px;
  top: 208px;
}

.star8 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 82px;
  top: 174px;
}

.star9 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 21px;
  top: 169px;
}

.star10 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 112px;
  top: 211px;
}

.star11 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 79px;
  top: 88px;
}

.star12 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 104px;
  top: 123px;
}

.star13 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 7px;
  top: 184px;
}

.star14 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 94px;
  top: 203px;
}

.star15 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 108px;
  top: 94px;
}

.star16 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 139px;
  top: 216px;
}

.star17 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 67px;
  top: 164px;
}

.star18 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 119px;
  top: 70px;
}

.star19 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 54px;
  top: 178px;
}

.star20 {
  width: 1px;
  height: 1px;
  transform: scale(1.1);
  left: 61px;
  top: 28px;
}

.star21 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 79px;
  top: 126px;
}

.star22 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 128px;
  top: 228px;
}

.star23 {
  width: 2px;
  height: 2px;
  transform: scale(1.1);
  left: 160px;
  top: 69px;
}

.star24 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 107px;
  top: 150px;
}

.star25 {
  width: 3px;
  height: 3px;
  transform: scale(1.1);
  left: 3px;
  top: 14px;
}

.lanternX1 {
  position: absolute;
  bottom: -80px;
  left: 21px;
  transform: translateX(0);
  animation-name: lanternX1;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY1 {
  display: inline block;
  width: 41px;
  z-index: 61000;
  animation-name: lanternY;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 2s;
}

@keyframes lanternX1 {
  50% {
    transform: translateX(3px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX2 {
  position: absolute;
  bottom: -80px;
  left: 39px;
  transform: translateX(0);
  animation-name: lanternX2;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY2 {
  display: inline block;
  width: 25px;
  z-index: 45000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 2s;
}

@keyframes lanternX2 {
  50% {
    transform: translateX(27px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX3 {
  position: absolute;
  bottom: -80px;
  left: 3px;
  transform: translateX(0);
  animation-name: lanternX3;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY3 {
  display: inline block;
  width: 53px;
  z-index: 73000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 6s;
}

@keyframes lanternX3 {
  50% {
    transform: translateX(49px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX4 {
  position: absolute;
  bottom: -80px;
  left: 25px;
  transform: translateX(0);
  animation-name: lanternX4;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY4 {
  display: inline block;
  width: 21px;
  z-index: 41000;
  animation-name: lanternY;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 5s;
}

@keyframes lanternX4 {
  50% {
    transform: translateX(2px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX5 {
  position: absolute;
  bottom: -80px;
  left: 92px;
  transform: translateX(0);
  animation-name: lanternX5;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY5 {
  display: inline block;
  width: 52px;
  z-index: 72000;
  animation-name: lanternY;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 4s;
}

@keyframes lanternX5 {
  50% {
    transform: translateX(31px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX6 {
  position: absolute;
  bottom: -80px;
  left: 32px;
  transform: translateX(0);
  animation-name: lanternX6;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY6 {
  display: inline block;
  width: 29px;
  z-index: 49000;
  animation-name: lanternY;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 5s;
}

@keyframes lanternX6 {
  50% {
    transform: translateX(32px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX7 {
  position: absolute;
  bottom: -80px;
  left: 3px;
  transform: translateX(0);
  animation-name: lanternX7;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY7 {
  display: inline block;
  width: 23px;
  z-index: 43000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 5s;
}

@keyframes lanternX7 {
  50% {
    transform: translateX(41px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX8 {
  position: absolute;
  bottom: -80px;
  left: 72px;
  transform: translateX(0);
  animation-name: lanternX8;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY8 {
  display: inline block;
  width: 39px;
  z-index: 59000;
  animation-name: lanternY;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 6s;
}

@keyframes lanternX8 {
  50% {
    transform: translateX(12px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX9 {
  position: absolute;
  bottom: -80px;
  left: 1px;
  transform: translateX(0);
  animation-name: lanternX9;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY9 {
  display: inline block;
  width: 31px;
  z-index: 51000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 6s;
}

@keyframes lanternX9 {
  50% {
    transform: translateX(48px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

.lanternX10 {
  position: absolute;
  bottom: -80px;
  left: 83px;
  transform: translateX(0);
  animation-name: lanternX10;
  animation-duration: 9s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.lanternY10 {
  display: inline block;
  width: 46px;
  z-index: 66000;
  animation-name: lanternY;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform: translateY(0);
  animation-delay: 4s;
}

@keyframes lanternX10 {
  50% {
    transform: translateX(69px);
  }
}

@keyframes lanternY {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateY(-400px);
  }
}

/* --------Social Icons-------- */
/* Color Variables */
/* Social Icon Mixin */
.social-icons {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 25px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  margin: 0 0.7rem;
  border-radius: 50%;
  cursor: pointer;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.15s ease;
}

.social-icon:hover {
  color: #fff;
}

.social-icon:hover .tooltip {
  visibility: visible;
  opacity: 1;
  transform: translate(-50%, -150%);
}

.social-icon:active {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5) inset;
}

.social-icon--twitter {
  background: #2b97f1;
  color: #fff;
}

.social-icon--twitter .tooltip {
  background: #2b97f1;
  color: currentColor;
}

.social-icon--twitter .tooltip:after {
  border-top-color: #2b97f1;
}

.social-icon--codepen {
  background: #000;
  color: #fff;
}

.social-icon--codepen .tooltip {
  background: #000;
  color: currentColor;
}

.social-icon--codepen .tooltip:after {
  border-top-color: #000;
}

.social-icon i {
  position: relative;
  top: 1px;
}
</style>
