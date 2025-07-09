<script setup lang="ts">
export interface Props {
  n: number
  filled: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="w-14 h-14 border-2 border-white/10 rounded-full cursor-pointer"
    :class="{
      'ball text-4xl/13 text-white': filled,
      'hole text-2xl/13 text-white/50 hover:text-white hover:border-white/20': !filled,
    }"
  >
    {{ n }}
  </div>
</template>

<style>
.hole {
  background-color: #336;
  box-shadow: inset -25px -15px 40px #0006;
  background-image: linear-gradient(-45deg, #FFE6 0%, transparent 100%);
}
.ball {
  background: radial-gradient(circle at 65% 15%, white 1px, #DDD 3%, #668 60%, #DDD 100%);
  text-shadow: 1px 1px 1px black;
}
</style>
