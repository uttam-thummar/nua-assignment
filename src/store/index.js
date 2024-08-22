import { createStore } from 'vuex';
import apiService from '../services/apiService';

export default createStore({
    state: {
        loading: false,
        countries: [],
        displayedCountries: [],
        regions: [],
        selectedCountry: null,
        error: null,
        currentPage: 1,
        pageSize: 20
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_COUNTRIES(state, countries) {
            state.countries = countries;
            state.displayedCountries = countries.slice(0, state.pageSize);
        },
        SET_REGIONS(state, regions) {
            state.regions = regions;
        },
        SET_SELECTED_COUNTRY(state, country) {
            state.selectedCountry = country;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        LOAD_MORE_COUNTRIES(state) {
            const start = state.currentPage * state.pageSize;
            const end = start + state.pageSize;
            state.displayedCountries = state.countries.slice(0, end);
            state.currentPage += 1;
        }
    },
    actions: {
        async fetchCountries({ commit }) {
            try {
                commit('SET_LOADING', true);
                const countries = await apiService.getCountries();
                commit('SET_COUNTRIES', countries);

                const regions = Array.from(new Set(countries.map((c) => c.region)));
                commit('SET_REGIONS', regions);
                commit('SET_LOADING', false);
            } catch (error) {
                commit('SET_ERROR', error.response.data.message);
                commit('SET_COUNTRIES', []);
                commit('SET_LOADING', false);
            }
        },
        async fetchCountriesByRegion({ commit }, region) {
            try {
                commit('SET_LOADING', true);
                const countries = await apiService.getCountriesByRegion(region);
                commit('SET_COUNTRIES', countries);
                commit('SET_LOADING', false);
            } catch (error) {
                commit('SET_ERROR', error.response.data.message);
                commit('SET_COUNTRIES', []);
                commit('SET_LOADING', false);
            }
        },
        async fetchCountriesByName({ commit }, name) {
            try {
                commit('SET_LOADING', true);
                const countries = await apiService.getCountriesByName(name);
                commit('SET_COUNTRIES', countries);
                commit('SET_LOADING', false);
            } catch (error) {
                commit('SET_ERROR', error.response.data.message);
                commit('SET_COUNTRIES', []);
                commit('SET_LOADING', false);
            }
        },
        selectCountry({ commit }, country) {
            commit('SET_SELECTED_COUNTRY', country);
        },
        loadMoreCountries({ commit }) {
            commit('LOAD_MORE_COUNTRIES');
        }
    },
    getters: {
        loading: (state) => state.loading,
        countries: (state) => state.countries,
        displayedCountries: (state) => state.displayedCountries,
        selectedCountry: (state) => state.selectedCountry,
        regions: (state) => state.regions,
        error: (state) => state.error
    }
});