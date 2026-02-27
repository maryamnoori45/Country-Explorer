export default function ErrorBox({ error, retry }) {
  return (
    <div className="error-box">
      <p>Error: {error}</p>
      <button className="btn" onClick={retry}>
        Retry
      </button>
    </div>
  );
}