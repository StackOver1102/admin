import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./Screen/LoginScreen";
import HomeScreen from "./Screen/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncProducts } from "./features/productSlide/productSlice";
import * as PayService from "./Services/OrderSevice";
import { updatePay } from "./features/Order/Order";
import ProductScreen from "./Screen/ProductScreen";
import AddProduct from "./Screen/AddProductScreen";
import EditProductMain from "./Components/Product/EditProduct";
import EditProductScreen from "./Screen/EditProductSreen";
import OrderScreen from "./Screen/OrdersScreen";

function App() {
  const userLogin = useSelector((state) => state.user);
  // const location = useLocation();

  const dispatch = useDispatch();
  const { email } = userLogin;
  const pageNumber = 1;

  useEffect(() => {
    if (email !== "") {
      dispatch(fetchAsyncProducts());
      // hangldeGetAll()
    }
  }, [dispatch]);
  const hangldeGetAll = async () => {
    const res = await PayService.getPay();
    dispatch(updatePay(res));
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/orders" element={<OrderScreen />} />

        <Route path="/product/:id/edit" element={<EditProductScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
