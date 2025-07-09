<script setup lang="ts">
import { shallowRef } from 'vue'
import BallSlot from './components/BallSlot.vue'
import Button from './components/Button.vue'

import useBingo, { type Bingo } from './useBingo'
import useLog from './useLog'

const { board, toggle, reset } = useBingo()
const { logEntries, log, deleteLog } = useLog()

function toggleAndLog(col: Bingo, index: number) {
  const added = toggle(col, index)
  log(added ? 'add' : 'del', col, index)
}

const confirmReset = shallowRef(false)
function reallyReset() {
  reset()
  log('reset')
  confirmReset.value = false
}

const confirmDeleteLog = shallowRef(false)
function reallyDeleteLog() {
  deleteLog()
  confirmDeleteLog.value = false
}
</script>

<template>
  <main class="flex bg-black overflow-x-auto">
    <table class="w-screen md:w-140 text-center">
      <thead class="text-4xl bg-white/20">
        <tr>
          <th v-for="(_,col) in board">
            {{ col.toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 15" class="even:bg-white/10"  >
          <td v-for="(list,col,j) in board" class="pl-1 md:pl-7 py-1">
            <BallSlot :n="j*15 + i" :filled="list[i-1]" @click="toggleAndLog(col, i)" />
          </td>
        </tr>
      </tbody>
    </table>

    <aside class="w-40 pt-5 flex flex-col justify-between bg-gray-800">
      <ol class="w-full max-h-[90vh] overflow-auto pl-2">
        <li class="font-bold">Historie:</li>
        <li v-for="entry in logEntries" :class="{
          'text-blue-100': entry.action === 'add',
          'text-red-200': entry.action === 'del',
          'text-red-300': entry.action === 'reset',
        }">
          {{ entry.pretty }}
        </li>
      </ol>
      <div>
        <Button @click="confirmReset = true" v-if="!confirmReset && !confirmDeleteLog">zurücksetzen</Button>
        <template v-else-if="!confirmDeleteLog">
          <Button @click="confirmReset = false">Doch nicht</Button>
          <Button @click="reallyReset()">Wirklich zurücksetzen!</Button>
        </template>

        <Button @click="confirmDeleteLog = true" v-if="!confirmDeleteLog && !confirmReset">Log löschen</Button>
        <template v-else-if="!confirmReset">
          <Button @click="reallyDeleteLog()">Wirklich löschen!</Button>
          <Button @click="confirmDeleteLog = false">Doch nicht</Button>
        </template>
      </div>
    </aside>
  </main>
</template>
