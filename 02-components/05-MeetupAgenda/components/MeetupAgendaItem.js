import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  agendaItemDefaultTitles,
  agendaItemIcons,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {    
    title() {
      if (this.agendaItem.title) {
        return this.agendaItem.title;
      }
      return agendaItemDefaultTitles[this.agendaItem.type];
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img 
          :src="\`../../assets/icons/icon-\${$options.agendaItemIcons[agendaItem.type]}.svg\`"
          :alt="$options.agendaItemIcons[agendaItem.type]"/>
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
