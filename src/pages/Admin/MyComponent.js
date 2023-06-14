import React from 'react';
import { Button, Table } from 'react-bootstrap';

function ProductTable({ products, onPriceChange, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              <input
                type="number"
                value={product.price}
                onChange={(e) => onPriceChange(product.id, e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={product.amount}
              />
            </td>
            <td>
              <Button variant="danger" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

// Usage example:
function MyComponent() {
  const products = [
    { id: 1, name: 'nike shoes', price: 350,amount: 2},
    { id: 2, name: 'black adidas shirts', price: 20,amount:15 },
    { id: 3, name: 'adidas hat', price: 30,amount:1 },
    { id: 4, name: 'pack of 5 Nike socks', price: 10,amount:10 },
    { id: 5, name: 'wrist bands for sweat', price: 15,amount:18 },
    { id: 6, name: 'Football', price: 60,amount:30 },
  ];

  const handlePriceChange = (productId, newPrice) => {
    // Update the price of the product with the given ID
    // based on the newPrice value
    // ...
  };

  const handleDelete = (productId) => {
    // Delete the product with the given ID
    // ...
  };

  return (
    <div>
      <h1>Your Products</h1>
      <ProductTable
        products={products}
        onPriceChange={handlePriceChange}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MyComponent;