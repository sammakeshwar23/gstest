import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';  // Import the styles

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);  // Ensure it's always an array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;  // If no token, don't fetch products

      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage, limit: 10 },
        });
        console.log("response.data",response.data)
        if (response.data && response.data) {
          setProducts(response.data); // Assuming the response has a 'products' key
          setTotalPages(response.data.totalPages || 2);  // Assuming the response has 'totalPages'
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page (you can change this to your preferred route)
  };

  return (
    <div className="container">
      <h1>Products</h1>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {/* Conditional rendering for products */}
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span>{product.title}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p> // Display a message if no products are available
      )}

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
