<script>
import { defineComponent } from "vue";
import CountryInformationExplorer from '../components/CountryInformationExplorer.vue';

export default defineComponent({
  components: {
    CountryInformationExplorer
  }
});
</script>

<template>
  <div>
    <CountryInformationExplorer />
  </div>
</template>

<style scoped></style>