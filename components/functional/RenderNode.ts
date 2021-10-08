import Vue from 'vue'

export default Vue.extend({
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.node
  },
})
