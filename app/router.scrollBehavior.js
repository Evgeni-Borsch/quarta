export default function (to, from, savedPosition) {
  if (to.name === from.name) return savedPosition
  return { x: 0, y: 0 }
}
