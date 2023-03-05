<template>
  <button type="button" @click="counter ++">{{ counter }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    }
  },

  emits: ['update:count'],
  data() {
    return {
      counter: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        if (this.counter !== this.count) this.counter = newValue;
      }
    },
    counter: {
      handler() {
        if (this.counter !== this.count) {
          this.$emit('update:count', this.counter );
        }
      },
    },
  }
};
</script>
