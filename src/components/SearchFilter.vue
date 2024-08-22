<template>
    <div class="text-center mb-6 flex justify-center gap-4 flex-col sm:flex-row items-center">
        <input v-model="searchQuery" @input="searchCountry" type="text" placeholder="Search by country name..."
            class="w-full max-w-xs py-2 px-4 rounded-lg shadow-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-transform transform hover:scale-105 outline-none dark:text-gray-500" />
        <select v-model="selectedRegion" @change="filterByRegion"
            class="w-full max-w-xs py-2 px-4 rounded-lg shadow-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-transform transform hover:scale-105 dark:text-gray-500">
            <option value="">All Regions</option>
            <option v-for="(region, index) in regions" :key="index" :value="region">{{ region }}</option>
        </select>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore, mapActions } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const regions = computed(() => store.getters.regions);

        return { regions };
    },
    data() {
        return {
            searchQuery: '',
            selectedRegion: '',
        };
    },
    methods: {
        ...mapActions(['fetchCountries', 'fetchCountriesByName', 'fetchCountriesByRegion']),
        searchCountry() {
            if (this.searchQuery) {
                this.fetchCountriesByName(this.searchQuery);
            } else {
                this.fetchCountries();
            }
        },
        filterByRegion() {
            if (this.selectedRegion) {
                this.fetchCountriesByRegion(this.selectedRegion);
            } else {
                this.fetchCountries();
            }
        }
    },
});
</script>