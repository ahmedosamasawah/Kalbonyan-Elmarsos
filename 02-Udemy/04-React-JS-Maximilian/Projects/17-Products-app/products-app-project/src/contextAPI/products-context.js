import React, { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {},
});

const ProviderContext = (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "b1",
      title: "scarf",
      description: "scarf",
      isFavorite: false,
    },
    {
      id: "b2",
      title: "T-Shirt",
      description: "t-shirt",
      isFavorite: false,
    },
    {
      id: "b3",
      title: "trousers",
      description: "trousers",
      isFavorite: false,
    },
    {
      id: "b4",
      title: "hat",
      description: "hat",
      isFavorite: false,
    },
  ]);

  const toggleFavoriteHandler = (id) => {
    setProductsList((prevState) => {
      const prodIndex = productsList.findIndex((p) => p.id === id);

      const newFavStatus = !prevState[prodIndex].isFavorite;
      const updatedProducts = [...prevState];
      updatedProducts[prodIndex] = {
        ...prevState[prodIndex],
        isFavorite: newFavStatus,
      };

      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavoriteHandler }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
export default ProviderContext;
