import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const APIurl = `${import.meta.env.VITE_API_URL}/search`;

  const loadProducts = async () => {
    if (
      filters.minPrice &&
      filters.maxPrice &&
      parseInt(filters.minPrice) > parseInt(filters.maxPrice)
    ) {
      setError("Min price canot be greater than max price");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const queryParams = new URLSearchParams(filters).toString(); 
      const response = await fetch(`${APIurl}?${queryParams}`);
      const result = await response.json();
      setProducts(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(); // fetch all products on initial mount
  }, []);

  // updates filters 
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Zeerostock</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <input
          placeholder="Enter product name"
          name="q"
          onChange={handleChange}
          style={{ padding: "8px" }}
        />
        <select
          name="category"
          onChange={handleChange}
          style={{ padding: "8px" }}
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input
          placeholder="Min price"
          name="minPrice"
          onChange={handleChange}
          type="number"
          min={0}
          style={{ padding: "8px" }}
        />
        <input
          placeholder="Max price"
          name="maxPrice"
          onChange={handleChange}
          type="number"
          min={0}
          style={{ padding: "8px" }}
        />
      </div>
      <button
        style={{ padding: "8px", width: "100%", backgroundColor: "blueviolet" }}
        onClick={loadProducts}
      >
        Search products
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading &&
        !error &&
        (products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "33%", padding: "8px" }}>Name</th>
                <th style={{ width: "33%", padding: "8px" }}>Category</th>
                <th style={{ width: "33%", padding: "8px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "8px" }}>{item.product_name}</td>
                  <td style={{ padding: "8px" }}>{item.category}</td>
                  <td style={{ padding: "8px" }}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </>
  );
}

export default App;
