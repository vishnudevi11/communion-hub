import { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Fetch from backend
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Backend Response: {data ? data.message : "Loading..."}</p>
    </div>
  );
}

export default FetchData;
