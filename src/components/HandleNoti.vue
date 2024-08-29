<script setup>
  const props = defineProps({
    noti: Object
  });
</script>

<template>
  <div id="copytoclipboard" :class="noti.status">
    {{ noti.text }}
  </div>
</template>

<style scoped>
  #copytoclipboard {
    position: fixed;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
    background: #282b30;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 13px;
    z-index: 9999999999;
    box-shadow: 0 0 2px 0 #a0a0a2 inset;
  }
  .success {
    color: #24af6c;
  }
  .error {
    color: #f14545;
  }
</style>