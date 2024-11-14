function Country({ country }) {
    return (
      <div class="cards">
        <img src={country.flags?.svg} alt={`${country.name.common} flag`} width="100" />
        <h2>{country.name.common}</h2>
        <p><strong>Official name:</strong> {country.name.official}</p>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Continent:</strong> {country.continents ? country.continents[0] : 'N/A'}</p>
        <p><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
        <a 
        href={`https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="google-maps-link"
      >
        Show on Google Maps
      </a>
      </div>
    );
  }
  
  export default Country;
  