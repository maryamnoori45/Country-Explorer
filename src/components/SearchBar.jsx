export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search"
      placeholder="🔍 Search country..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}