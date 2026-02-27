import { useEffect, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import CountryList from "./components/CountryList";
import ErrorBox from "./components/ErrorBox";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = "https://restcountries.com/v3.1/all";

      if (search.length >= 1 && region !== "all") {
        url = `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`;
      } else if (search.length >= 1) {
        url = `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch countries");

      const data = await res.json();

      
      data.sort((a, b) => b.population - a.population);

      setCountries(data);
    } catch (err) {
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [search, region]);

  return (
   <div className="all">
     <div className="app">
      <h1>🌍 Countries Explorer</h1>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>

      {loading && <p className="loading">Loading countries...</p>}
      {error && <ErrorBox error={error} retry={fetchCountries} />}

      {!loading && !error && <CountryList countries={countries} />}
    </div>
   </div>
  );
}