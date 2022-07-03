<script setup lang="ts">
import ViewGroup from "@src/components/Projects/EffectsProjectView_Group.vue";
import ViewItem from "@src/components/Projects/EffectsProjectView_Item.vue";

import FingerprintScannerA from "./l00-FingerprintScanner-A.vue";
import FacialScannerA from "./l00-FacialScanner-A.vue";

</script>

<template>
  <ViewGroup>
    <ViewItem style="height: 90vh; background: #111" name="effect-scanner-facial-a">
      <FacialScannerA></FacialScannerA>
    </ViewItem>

    <ViewItem style="height: 90vh; background: #111" name="effect-scanner-fingerprint-a">
      <FingerprintScannerA></FingerprintScannerA>
    </ViewItem>
  </ViewGroup>
</template>

<style scoped></style>
