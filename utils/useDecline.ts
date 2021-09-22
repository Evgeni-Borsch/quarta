import declineWord from 'decline-word'

export default function useDecline(array: Array<string>) {
  if (array.length !== 3) {
    throw new Error('You must provide all three froms of word')
  }

  return (count: number) => {
    return declineWord(count, '', array[0], array[1], array[2])
  }
}
