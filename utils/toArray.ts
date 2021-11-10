export default function toArray<T>(object: { [key: string]: T }): Array<T> {
  const keys = Object.keys(object)
  return keys.map((key) => object[key])
}
