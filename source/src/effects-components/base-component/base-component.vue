<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import BaseCheckboxA from "./l00-BaseCheckbox-A.vue";
const inputBaseCheckboxA = ref(false);
</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90; background: #f3f3f3" name="base-component-checkbox-a">
      <BaseCheckboxA v-model="inputBaseCheckboxA"></BaseCheckboxA>
      <span style="margin-left: 1em;">{{ inputBaseCheckboxA ? "on" : "off" }}</span>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
