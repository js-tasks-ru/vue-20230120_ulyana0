import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      isLoading: true,
      error: null,
    };
  },

  watch: {
    meetupId: {
      handler(Value) {
        this.meetup = null;
        this.isLoading = true;
        this.error = '';

        fetchMeetupById(Value).then((meetup) => {
        this.meetup = meetup;
        })
        .catch((error) => {
          this.error = error.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer>
        <UiAlert v-if="isLoading">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-else-if="error">{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
