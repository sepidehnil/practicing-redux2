import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  //put request will override the existing data
  /////////////////////////////////////////////////////example 1 using useeffect for send http request
  useEffect(() => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart Data",
      })
    );

    const sendCartData = async () => {
      //cart.json create a new cart node in database
      const response = await fetch("sdfsdf/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart), //convert cart to json data
      });
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Success",
          message: "Send cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "error",
          message: "Send cart data failes",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Layout>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
