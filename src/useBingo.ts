import { useStorage } from '@vueuse/core'

export type Bingo = 'b'|'i'|'n'|'g'|'o'
export type Board = Record<Bingo, boolean[]>

export function colToIndex(col: Bingo): number {
  return 'bingo'.split('').indexOf(col)
}
export function calcNumber(col: Bingo, index: number): number {
  const colIndex = colToIndex(col)
  return colIndex*15 + index
}

export default function useBingo() {
  const board = useStorage<Board>('bingo-board', {
    b: Array.from({ length: 15 }, () => false),
    i: Array.from({ length: 15 }, () => false),
    n: Array.from({ length: 15 }, () => false),
    g: Array.from({ length: 15 }, () => false),
    o: Array.from({ length: 15 }, () => false),
  })

  function toggle(col: Bingo, index: number): boolean {
    const newValue = !board.value[col][index - 1]
    board.value[col][index - 1] = newValue
    return newValue
  }

  function reset() {
    board.value = {
      b: Array.from({ length: 15 }, () => false),
      i: Array.from({ length: 15 }, () => false),
      n: Array.from({ length: 15 }, () => false),
      g: Array.from({ length: 15 }, () => false),
      o: Array.from({ length: 15 }, () => false),
    }
  }

  return { board, toggle, reset }
}
