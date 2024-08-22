import axios from 'axios';
import { sortCountriesByPopulation } from '@/utils/helper';

const API_URL = 'https://restcountries.com/v3.1';

export default {
    async getCountries() {
        let endpoint = '/all';
        const response = await axios.get(`${API_URL}${endpoint}`);
        return sortCountriesByPopulation(response.data);
    },
    async getCountriesByRegion(region) {
        const response = await axios.get(`${API_URL}/region/${region}`);
        return sortCountriesByPopulation(response.data);
    },
    async getCountriesByName(name) {
        const response = await axios.get(`${API_URL}/name/${name}`);
        return sortCountriesByPopulation(response.data);
    }
};