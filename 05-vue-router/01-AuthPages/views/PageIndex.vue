<template>
  <UiContainer>
    <h2 class="title">IndexPage</h2>
    Для проверки: <router-link to="/login?from=/">/login?from=/</router-link>
  </UiContainer>
</template>

<script>
import UiContainer from '../components/UiContainer.vue';

export default {
  name: 'PageIndex',
  components: { UiContainer },
};
</script>

<style></style>
