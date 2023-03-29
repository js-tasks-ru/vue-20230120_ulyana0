<template>  
  <slot :name="status" :result="result" :error="error" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      status: null,
      error: null,
      result: null
    }
  },
  watch: {
    promise: {
      immediate: true,
      handler() {
        this.status = 'pending';
        this.promise.then((data) => {
          this.status = 'fulfilled';
          this.result = data;
        }).catch((error) => {
          this.status = 'rejected';
          this.error = error;
        });
      },
    },
  },
};
</script>
