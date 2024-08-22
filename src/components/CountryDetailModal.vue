<template>
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 mx-5">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative dark:text-gray-700">
            <button @click="toggleModal(false)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 p-1 flex items-center justify-center focus:outline-none hover:bg-red-600 transition-transform transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="flex flex-col items-center">
                <img :src="selectedCountry.flags.png" :alt="selectedCountry.name.common"
                    class="w-24 h-24 object-contain mb-4 transition-transform transform hover:scale-110" />
                <h2 class="text-2xl font-bold mb-4">
                    {{ selectedCountry.name.common }}
                </h2>
                <div class="space-y-2">
                    <p>
                        <strong>Official Name:</strong>
                        {{ selectedCountry.name.official }}
                    </p>
                    <p>
                        <strong>Capital:</strong>
                        {{ selectedCountry.capital ? selectedCountry.capital[0] : 'N/A' }}
                    </p>
                    <p>
                        <strong>Region:</strong>
                        {{ selectedCountry.region }}
                    </p>
                    <p>
                        <strong>Subregion:</strong>
                        {{ selectedCountry.subregion }}
                    </p>
                    <p>
                        <strong>Lat/Long:</strong>
                        {{ selectedCountry.latlng.join(', ') }}
                    </p>
                    <p>
                        <strong>Language:</strong>
                        {{ selectedCountry.languages ? Object.values(selectedCountry.languages).join(', ') : 'N/A'
                        }}
                    </p>
                    <p>
                        <strong>Currency:</strong>
                        {{ selectedCountry.currencies ? Object.values(selectedCountry.currencies)[0].name : 'N/A' }}
                    </p>
                    <p>
                        <strong>Population:</strong>
                        {{ selectedCountry.population.toLocaleString() }}
                    </p>
                    <p>
                        <strong>UN Member:</strong>
                        {{ selectedCountry.unMember ? 'Yes' : 'No' }}
                    </p>
                    <p v-if="selectedCountry.borders && selectedCountry.borders.length">
                        <strong>Border Countries:</strong>
                        {{ selectedCountry.borders.join(', ') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const selectedCountry = computed(() => store.getters.selectedCountry);

        return { selectedCountry };
    },
    props: {
        showModal: {
            type: Boolean,
            required: true
        },
        toggleModal: {
            type: Function,
            required: true
        }
    },
});
</script>