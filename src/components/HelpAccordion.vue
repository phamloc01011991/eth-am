<script setup>
import HelpAccordionQuestion from './HelpAccordionQuestion.vue';
const props = defineProps({
    questions: Object
})
</script>

<template>
  <div id="help-accordion">
    <HelpAccordionQuestion v-for="question in props.questions" 
    :key="question.id" 
    :title="question.title" 
    :info="question.info"/>
  </div>
</template>

<style scoped>
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>