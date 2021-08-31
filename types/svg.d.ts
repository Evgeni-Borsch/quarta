declare module '*.svg' {
  const content: String
  export default content
}

declare module '*.svg?inline' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}

declare module '*.svg?icon' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}
