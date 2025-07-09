import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { calcNumber, type Bingo } from './useBingo'

type LogEntry = { action: 'add' | 'del', col: Bingo, index: number } | { action: 'reset' }

function prettyLogEntry(entry: LogEntry): string {
  const germanAction = {
    'add': 'Gezogen',
    'del': 'Entfernt',
    'reset': 'Zurückgesetzt'
  }[entry.action]

  if (entry.action === 'reset') return germanAction

  const n = calcNumber(entry.col, entry.index)
  return `${germanAction}: ${entry.col.toUpperCase()}${n}`
}

export default function useLog() {
  const logEntries = useStorage<LogEntry[]>('bingo-log', [])

  const prettyEntries = computed(() => logEntries.value.map(entry => ({
    ...entry,
    pretty: prettyLogEntry(entry),
  })))

  function log(action: LogEntry['action'], col?: Bingo, index?: number) {
    // @ts-ignore-line
    if (action !== 'reset') logEntries.value.push({ action, col, index })
    else logEntries.value.push({ action })
  }

  function deleteLog() {
    logEntries.value.length = 0
  }

  return { logEntries: prettyEntries, log, deleteLog }
}
