<template>
  <div class="pagination-container">
    <slot v-for="item in pageOfItems" :item="item"/>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },

    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pageOfItems() {
      let begin = (this.page - 1) * this.perPage;
      let end = this.page * this.perPage;
      return this.items.slice(begin, end);
    },
  },
};
</script>

<style></style>
