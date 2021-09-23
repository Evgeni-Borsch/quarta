import Vue from 'vue'
import Component from 'vue-class-component'

let lastUid = -1

function getUid() {
  lastUid++
  return lastUid
}

@Component
export default class HasUid extends Vue {
  uid: number = getUid()
}
