import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { productID } = useParams();

  function getProductById(productsArray, productId) {
    return productsArray.find((product) => product.id === productId);
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/3-airtable?id=${productID}`);
      setProduct(() => getProductById(data, productID));
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  });

  if (loading) {
    return (
      <section className="section section-center">
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className="section section-center">
      <Link to="/" className="link">
        Back Home
      </Link>
      <div>
        <div className="title">
          <h2>{product.name}</h2>
          <div className="title-underline"></div>
        </div>
        <article className="single-product">
          <img
            className="single-product-img"
            src={product.url}
            alt={product.name}
          />
          <div>
            <h5>{product.name}</h5>
            <h5 className="price">${product.price}</h5>
            <p>{product.decs}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Product;
