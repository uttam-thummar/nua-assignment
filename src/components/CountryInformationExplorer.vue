<template>
    <div class="p-4 bg-gray-100 min-h-screen">
        <h1 class="text-3xl font-bold text-center mb-6 dark:text-gray-700">Country Information Explorer</h1>
        <SearchFilter />
        <div v-if="!loading && countries.length === 0" class="flex justify-center items-center h-64">
            <p class="text-center text-xl text-gray-500 font-semibold">
                No countries found. Try adjusting your search or filter.
            </p>
        </div>
        <div v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 relative min-h-[300px]">
            <LoaderVue v-if="loading" />
            <div v-for="country in displayedCountries" :key="country.alpha3Code" @click="selectCountry(country)"
                class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
                <img :src="country.flags.png" :alt="country.name.common" class="w-full h-32 object-cover" />
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2 dark:text-gray-700">
                        {{ country.name.common }}
                    </h2>
                    <p class="text-gray-700">
                        <strong>Capital:</strong>
                        {{ country.capital ? country.capital[0] : 'N/A' }}
                    </p>
                    <p class="text-gray-700">
                        <strong>Currency:</strong>
                        {{ country.currencies ? Object.values(country.currencies)[0].name : 'N/A' }}
                    </p>
                    <p class="text-gray-700">
                        <strong>Region:</strong>
                        {{ country.region }}
                    </p>
                    <p class="text-gray-700">
                        <strong>Lat/Long:</strong>
                        {{ country.latlng.join(', ') }}
                    </p>
                    <p class="text-gray-700">
                        <strong>Language:</strong>
                        {{ country.languages ? Object.values(country.languages).join(', ') : 'N/A' }}
                    </p>
                    <p class="text-gray-700">
                        <strong>Population:</strong>
                        {{ country.population.toLocaleString() }}
                    </p>
                </div>
            </div>
        </div>
        <div v-if="countries.length !== 0" class="text-center mb-6">
            <button v-if="displayedCountries.length !== countries.length" @click="loadMoreCountries"
                class="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Show more countries
            </button>
            <div v-else class="flex justify-center items-center gap-4 flex-col sm:flex-row">
                <div
                    class="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    You've seen all the countries!
                </div>
                <button v-if="countries.length > 40" @click="scrollToTop"
                    class="bg-purple-500 flex text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
                    Scroll to Top
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Modal -->
        <CountryDetailModal :showModal="showModal" :toggleModal="toggleModal" />
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore, mapActions } from 'vuex';
import SearchFilter from './SearchFilter.vue';
import CountryDetailModal from './CountryDetailModal.vue';
import LoaderVue from './Loader.vue';

export default {
    components: {
        SearchFilter,
        CountryDetailModal,
        LoaderVue
    },
    setup() {
        const loading = computed(() => store.getters.loading);
        const store = useStore();
        const countries = computed(() => store.getters.countries);
        const displayedCountries = computed(() => store.getters.displayedCountries);

        const showModal = ref(false);

        const toggleModal = (toggle) => {
            showModal.value = toggle;
        };

        const selectCountry = (country) => {
            store.dispatch('selectCountry', country);
            toggleModal(true);
        };

        const loadMoreCountries = () => {
            store.dispatch('loadMoreCountries');
        };

        return {
            loading,
            countries,
            displayedCountries,
            showModal,
            toggleModal,
            selectCountry,
            loadMoreCountries,
        };
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions(['fetchCountries']),
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    mounted() {
        this.fetchCountries();
    },
}
</script>