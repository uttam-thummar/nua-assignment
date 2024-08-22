export const sortCountriesByPopulation = (countries) => {
    return countries.sort((a, b) => b.population - a.population);
}