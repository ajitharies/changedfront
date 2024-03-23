// import React, { useState } from 'react';
// import './SearchPage.css'; // Import the CSS file

// const SearchPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     // Implement your search functionality here
//     // You can use the searchTerm state to search for products
//     // For example, you can send an API request to fetch products based on the searchTerm
//     console.log('Searching for:', searchTerm);
//     // You can customize this functionality based on your requirements
//   };

//   return (
//     <div className='searchpage'>
//     <div className="search-container">
//       {/* <h1>Search Page</h1> */}
//       <input
//         type="text"
//         className="search-input"
//         placeholder="Search products..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch} className="search-button">Search</button>
//       {/* Render search results or other components related to search */}
//       <div className="search-results">
//         {/* Render search results here */}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SearchPage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Search.css'; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproducts');
        if (response.status !== 200) {
          throw new Error('Failed to fetch products');
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return ( <div className='bg'>
    <div className="product-list-container">
      <h1>Product List</h1>
      <input className='searchbar'
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleChange}
      /><br/>
      <div className='arrange'>
      <div className="product-grid">
        {filteredProducts.map((product) => (
        
        <Link  to={`/product/${product.id}`} key={product.id} className="product-card">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        
        <p>New Price: {product.new_price}</p>
        <p>Old Price: {product.old_price}</p>
      </Link>
      
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductList;
