import { useEffect, useState } from "react";
import "./App.css";
import ProductTable from "./components/ProductTable";

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
    loadProducts(); // fetch all products
  }, []);

  // updates filters 
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Zeerostock</h1>
      <div className="filters-grid">
        <input
          placeholder="Enter product name"
          name="q"
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange}>
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
        />
        <input
          placeholder="Max price"
          name="maxPrice"
          onChange={handleChange}
          type="number"
          min={0}
        />
      </div>
      <button className="search-btn" onClick={loadProducts}>
        Search products
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <ProductTable products={products} />}
    </>
  );
}

export default App;
