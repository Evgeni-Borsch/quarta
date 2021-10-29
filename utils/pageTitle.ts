import { BASE_TITLE } from '~/services/constants'

export default function pageTitle(title: string) {
  return `${title} - ${BASE_TITLE}`
}
