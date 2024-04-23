//////////////////////////////////////exampl2 using action creators

import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("");
      if (!response.ok) {
        throw new Error("Could not fetch cart");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQantity: cartData.totalQantity,
        })
      );
      dispatch(
        uiActions.setNotification({
          status: "fetch",
          title: "fetching",
          message: "fetching cart Data",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: "fetching cart Data failed",
        })
      );
    }
  };
};

export const sendData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart Data",
      })
    );
    const sendRequest = async () => {
      //cart.json create a new cart node in database
      const response = await fetch("sdfsdf/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart), //convert cart to json data
      });
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success",
          message: "Send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "error",
          message: "Send cart data failes",
        })
      );
    }
  };
};
