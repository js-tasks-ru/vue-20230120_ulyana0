import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      num1: 0,
      num2: 0,
      operator: '',
    };
  },
  computed: {
    total() {
      switch (this.operator) {
        case 'sum':
          return this.num1 + this.num2;
        case 'subtract':
          return this.num1 - this.num2;
        case 'multiply':
          return this.num1 * this.num2;
        case 'divide':
          return this.num1 / this.num2;
        default:
          return 0;
      }
    },
  },
});
const app = createApp(App);
const vm = app.mount('#app');
