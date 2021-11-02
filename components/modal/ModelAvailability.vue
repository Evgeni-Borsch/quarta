<template>
  <ModalVue
    ref="modal"
    :title="!hasSubmit ? 'Сообщить о поступлении' : 'Заявка отправлена'"
    size="large"
    @hide="$emit('hide')"
  >
  </ModalVue>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import ModalVue from './Modal.vue'

import InputVue from '~/components/inputs/Input.vue'
import { FormErrors } from '~/services/errors'
import { user } from '~/store'
import { requestAvailabilityInform } from '~/services/api/catalog'

@Component({
  components: {
    ModalVue,
    InputVue
  }
})
export default class ModalAvailabilityVue extends Vue {}
</script>

<style lang="scss" scoped>
p {
  font-size: 1rem;
}
</style>
