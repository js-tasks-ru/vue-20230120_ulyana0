import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: {
      type: String,
      default: 'Описание должно быть здесь',
    },
  },
  template: `<p class="meetup-description">{{description}}</p>`,
});
