import { BaseStoredEntity } from '~/models/general'

export default function isOutdated(context: BaseStoredEntity) {
  const currentTimestamp = Math.round(Date.now() / 1000)
  return currentTimestamp - context.fetchedAt >= context.storeTimeout
}
