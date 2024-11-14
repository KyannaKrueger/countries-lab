import { useEffect, useState } from 'react';
import Countries from './Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [filters, setFilters] = useState({
    continent: 'All',
    subregion: 'All',
    top10ByPopulation: false,
    top10ByArea: false,
    alphabetical: false,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setCountries(data);
      setFilteredCountries(data);

      const uniqueContinents = Array.from(new Set(data.map(country => country.continents[0])));
      setContinents(['All', ...uniqueContinents]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let updatedCountries = [...countries];

    if (filters.continent !== 'All') {
      updatedCountries = updatedCountries.filter(country => country.continents[0] === filters.continent);

      const uniqueSubregions = Array.from(new Set(updatedCountries.map(country => country.subregion).filter(Boolean)));
      setSubregions(['All', ...uniqueSubregions]);
    } else {
      setSubregions(['All']);
    }

    if (filters.subregion !== 'All') {
      updatedCountries = updatedCountries.filter(country => country.subregion === filters.subregion);
    }

    if (filters.top10ByPopulation) {
      updatedCountries = updatedCountries
        .sort((a, b) => b.population - a.population)
        .slice(0, 10);
    } else if (filters.top10ByArea) {
      updatedCountries = updatedCountries
        .sort((a, b) => b.area - a.area)
        .slice(0, 10);
    } else if (filters.alphabetical) {
      updatedCountries = updatedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    setFilteredCountries(updatedCountries);
  }, [filters, countries]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters(prevFilters => {
      if (name === 'top10ByPopulation' || name === 'top10ByArea') {
        return {
          ...prevFilters,
          top10ByPopulation: name === 'top10ByPopulation' ? checked : false,
          top10ByArea: name === 'top10ByArea' ? checked : false,
          alphabetical: false, 
        };
      }

      if (name === 'alphabetical') {
        return { ...prevFilters, alphabetical: checked, top10ByPopulation: false, top10ByArea: false };
      }

      if (name === 'continent') {
        return { ...prevFilters, continent: value, subregion: 'All' };
      }

      return { ...prevFilters, [name]: value };
    });
  };

  return (
    <div class="main">
      <h1>Countries of the World</h1>
      <h3>Filter and  Sort</h3>
      
      <div class="filters">
      <label class="alpha">
          <input
            type="checkbox"
            name="alphabetical"
            checked={filters.alphabetical}
            onChange={handleFilterChange}
          />
          Alpha
        </label>

        <div class="topTen">
          <p>Top 10</p>
          <label>
            <input
              type="checkbox"
              name="top10ByPopulation"
              checked={filters.top10ByPopulation}
              onChange={handleFilterChange}
            />
            by Population
          </label>
          <label>
            <input
              type="checkbox"
              name="top10ByArea"
              checked={filters.top10ByArea}
              onChange={handleFilterChange}
            />
            by Area
          </label>
        </div>

        <label class="byLocation">By Continent:</label>
        <select name="continent" value={filters.continent} onChange={handleFilterChange} class="drop">
          {continents.map(continent => (
            <option key={continent} value={continent}>{continent}</option>
          ))}
        </select>

        <label class="byLocation">By Subregion:</label>
        <select name="subregion" value={filters.subregion} onChange={handleFilterChange} class="drop">
          {subregions.map(subregion => (
            <option key={subregion} value={subregion}>{subregion}</option>
          ))}
        </select>

      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
