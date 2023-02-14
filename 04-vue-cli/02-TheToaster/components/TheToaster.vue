<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :type="toast.type" >
      <span>{{ toast.message }}</span>
    </ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';
export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
      duration: 5000,
    };
  },
  
  methods: {
    error(message) {
      this.toasts.push({
        type: 'error',
        message,
      });
      this.hideToast();
    },
    success(message) {
      this.toasts.push({
        type: 'success',
        message,
      });
      this.hideToast();
    },    
    hideToast() {
      setTimeout(
        () => this.toasts.splice(0, 1)
        , this.duration
      );
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}
@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>