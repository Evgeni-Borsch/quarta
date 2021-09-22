export default function getLatest(arr: Array<unknown>): unknown {
  const length = arr.length
  return arr[length - 1]
}
