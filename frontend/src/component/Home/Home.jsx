import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import {
  setError,
  fetchAllProductsAsync,
  selectAllProducts,
} from "../../features/product/productSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
      toast.error(error);
    }
    dispatch(fetchAllProductsAsync(products));
  }, [dispatch, error]);

  return (
    <Fragment>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
