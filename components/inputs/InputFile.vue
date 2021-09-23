<template>
  <div
    class="input-file"
    :class="{ 'input-file--max-count-reached': maxCountReached() }"
  >
    <label :for="`i_${uid}`">
      <AttachmentIcon class="input-file__icon" />
      {{
        maxCountReached()
          ? 'Достигнуто максимальное колличество файлов'
          : `${label} (не более ${maxSize / 1024 ** 2}MB)`
      }}
    </label>
    <input
      :id="`i_${uid}`"
      :multiple="multiple"
      type="file"
      @change="onFileAdd"
    />

    <div
      v-if="files.length && filesView === 'list'"
      class="input-file__files--list"
    >
      <div v-for="file of files" :key="file.name" class="input-file__file">
        {{ file.name }}
        <CloseIcon
          class="input-file__file-remove"
          @click="() => removeFile(file)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import BaseInput from '~/mixins/BaseInput'
import AttachmentIcon from '~/assets/icons/attachment.svg?icon'
import CloseIcon from '~/assets/icons/close.svg?icon'

@Component({
  components: {
    AttachmentIcon,
    CloseIcon,
  },
})
export default class InputFile extends mixins(BaseInput) {
  files: Array<File> = []

  @Prop({ default: 'Прикрепить файл' }) label!: string
  @Prop({ default: 0 }) maxFiles!: number
  @Prop({ default: 1024 ** 2 * 5 }) maxSize!: number // default 5MiB
  @Prop({ default: 'list' }) filesView!: string
  @Prop({ default: false }) multiple!: boolean

  isFileAlreadyAdded(file: File) {
    return this.files.findIndex((f) => f.name === file.name)
  }

  removeFile(file: File) {
    const index = this.files.indexOf(file)
    this.files.splice(index, 1)
  }

  maxCountReached() {
    if (this.maxFiles === 0) return false
    return this.files.length >= this.maxFiles
  }

  onFileAdd(e: Event & { target: HTMLInputElement }) {
    const files = e.target.files as FileList & Array<File>

    if (!files) return

    files.forEach((file) => {
      if (file.size > this.maxSize) return
      if (this.maxCountReached()) return

      const condidateIndex = this.isFileAlreadyAdded(file)
      if (condidateIndex > -1) return this.files.splice(condidateIndex, 1, file)

      this.files.push(file)
    })
  }

  @Watch('files')
  @Emit('input')
  onChange(files: Array<File>) {
    return files
  }
}
</script>

<style lang="scss">
.input-file {
  input {
    display: none;
  }

  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 0.875rem 1.5625rem;
    background-color: $gray-100;
    border: $input-border-width solid;
    border-color: $input-border-color;
    border-radius: $btn-border-radius;

    font-size: 0.75rem;
    color: $gray-800;

    cursor: pointer;
  }

  &--max-count-reached label {
    pointer-events: none;
    opacity: 0.75;
  }

  &__icon {
    color: $gray-600;
    margin-right: 0.5rem;
  }

  &__files--list {
    padding: 1rem;

    font-size: 0.75rem;
    color: $gray-800;
  }

  &__file {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__file-remove {
    transition: transform 0.2s;
    transform: scale(1.15);
    cursor: pointer;

    &:hover {
      transform: scale(1.35);
    }
  }
}
</style>
