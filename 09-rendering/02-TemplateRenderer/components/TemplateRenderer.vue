<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  computed: {
    CustomComponent() {
      return defineComponent({
        name: 'CustomComponent',
        components: this.components,
        props: ['bindings'],
        render: compile(this.template),
      });
    },
  },
  render() {         
    return h(this.CustomComponent, { bindings: this.bindings });
  },
};
</script>
