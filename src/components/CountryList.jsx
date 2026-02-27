import CountryCard from "./CountryCard";

export default function CountryList({ countries }) {
  if (!countries.length)
    return <p className="no-results">No results found 😔</p>;

  return (
    <div className="grid">
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </div>
  );
}