import levenshtein from 'fast-levenshtein'
import escapeStringRegexp from '~/utils/escapeStringRegexp'

interface NamedItem {
  name: string
}

/**
 * ### How it works:
 *
 * 1) If the search string is empty, it returns all items.
 * 2) Returns items in which the search string matches one of the
 *    words in the item name.
 * 3) In case of a typo in the input, it returns items in which the
 *    Levenshtein distance is no more than a third of the length of the item name string.
 */

export default function levenshteinFilter(
  items: Array<NamedItem>,
  search: string
) {
  const preparedSearch = search.trim().toLowerCase()

  if (preparedSearch === '') return items

  return items.filter((item) => {
    const name = item.name.toLowerCase()

    if (
      // eslint-disable-next-line no-useless-escape
      new RegExp(`(^| +)${escapeStringRegexp(preparedSearch)}`, 'i').test(name)
    ) {
      return true
    }

    const length = name.length
    const distance = levenshtein.get(name, preparedSearch)
    const coefficient = Math.min(distance / length, 1)

    return coefficient <= 0.666
  })
}
