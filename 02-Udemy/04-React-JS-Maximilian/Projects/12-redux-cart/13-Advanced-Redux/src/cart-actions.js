import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = (cart) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://working-with-redux-164b5-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) throw new Error("Fetching data failed!");

      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error!",
          title: "Error...",
          message: "Sending data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://working-with-redux-164b5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) throw new Error("Sending data failed!");
    };

    await sendRequest();

    try {
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent data seccessfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error!",
          title: "Error...",
          message: "Sending data failed!",
        })
      );
    }
  };
};
