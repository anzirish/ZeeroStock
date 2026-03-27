function ProductTable({ products }) {
  if (products.length === 0) return <p>No products found</p>;

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.product_name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
