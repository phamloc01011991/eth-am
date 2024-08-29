<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  title: String,
  info: String
})

const expanded = ref(false);

const contentStyle = computed(() => {
  return { "max-height": expanded.value ? "300px" : 0 };
});

const infoStyle = computed(() => {
  return { opacity: expanded.value ? 1 : 0 };
});
</script>

<template>
  <article class="question">
    <header>
      <h4 @click="expanded = !expanded" class="question-title">
        {{ title }}
      </h4>
      <button class="btn" @click="expanded = !expanded">
        <i class='bx bx-plus' v-show="!expanded"></i>
        <i class='bx bx-minus' v-show="expanded"></i>
      </button>
    </header>
    <div :style="contentStyle" class="content">
      <p :style="infoStyle" class="info">{{ info }}</p>
    </div>
  </article>
</template>

<style scoped>
.question {
  padding: 1rem 1.5rem;
  border: 2px solid #282b30;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: #282b30;
}
.question h4 {
  text-transform: none;
  line-height: 1.5;
}
.question p {
  color: #a0a0a2;
  margin-bottom: 0;
  margin-top: 0.5rem;
}
.question header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.question header h4 {
  margin-bottom: 0;
}
.btn {
  background: transparent;
  border-color: transparent;
  width: 2rem;
  height: 2rem;
  background: #282b30;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  margin-left: 1rem;
  align-self: center;
  min-width: 2rem;
  z-index: 1;
}

.question-title {
  cursor: pointer;
}

.content {
  max-height: 0;
  transition: max-height 0.2s ease-out;
}
.info {
  z-index: -1;
  opacity: 0;
  transition: opacity 0.2s ease-out;
}
</style>