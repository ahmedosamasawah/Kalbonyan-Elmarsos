import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (currentState, id) => {
      const prodIndex = currentState.products.findIndex((p) => p.id === id);

      const newFavStatus = !currentState.products[prodIndex].isFavorite;
      const updatedProducts = [...currentState.products];
      updatedProducts[prodIndex] = {
        ...currentState.products[prodIndex],
        isFavorite: newFavStatus,
      };

      return { products: updatedProducts };
    },
  };
  initStore(actions, {
    products: [
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
    ],
  });
};
export default configureStore;
