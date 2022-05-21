<script setup lang="ts">
import { ref, Ref, UnwrapNestedRefs, inject, onMounted, onUnmounted } from "vue";

const props = defineProps<{
  active?: boolean
}>()

const glassItems: Set<Ref> = inject('glassItems') as Set<Ref>
const glassMarker: UnwrapNestedRefs<any> = inject('glassMarker') as UnwrapNestedRefs<any>

onMounted(() => glassItems.add(isActive))

onUnmounted(() => glassItems.delete(isActive))

const isActive = ref(undefined)
const changeStat = (target: HTMLElement) => {
  const { offsetLeft, offsetWidth } = target
  glassMarker.left = offsetLeft
  glassMarker.width = offsetWidth
  glassItems.forEach(other => other.value = other === isActive ? true : undefined)
}
const onMouseenter = (e: MouseEvent) => {
  changeStat(e.target as HTMLElement)
}

const elLi = ref(undefined)
onMounted(() => {
  if (props.active === true) changeStat(elLi.value! as HTMLElement)
})

</script>

<template>
  <li @mouseenter="onMouseenter" :active="isActive" ref="elLi">
    <slot></slot>
  </li>
</template>

<style scoped>
li>:deep(*) {
  font-size: 1em;
  color: #fff;
  display: inline-block;
  text-decoration: none;
  opacity: 0.25;
  transition: opacity 0.25s;
}

li[active]>:deep(*) {
  opacity: 1;
}
</style>
