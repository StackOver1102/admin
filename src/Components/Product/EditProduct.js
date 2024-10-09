import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import { fetchAsyncProductSingle } from "../../features/productSlide/productSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateProductSingle } from "../../features/productSlide/ProductSliceNew";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = props;

  const [rate, setRate] = useState(0);
  const [detalProduct, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  const handleGetDetailsProduct = async (id) => {

    const res = await ProductService.getDetilsProduct(id);
    if (res && res.data) {
      setDetail(res.data)
    }
    else {
      setDetail({})
    }
    setLoading(false)

  };
  const { productSingle } = useSelector(
    (state) => state.ProductSignle
  );
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    ProductService.updateProduct(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: id,
      rate
    });

  };

  useEffect(() => {
    handleGetDetailsProduct(id);

  }, [id]);

  useEffect(() => {
    if (isError) {
      toast.error(`Error updating product: ${error.message}`);
    }
    if (isSuccess) {
      toast.success("Product updated successfully!");
    }
  }, [isError, isSuccess, error]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Edit now
              </button>
            </div>
          </div>

          {loading ? <Loading /> : <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* Error Loading */}
                  {false && <Message variant="alert-danger">error</Message>}
                  {/* Update Loading */}

                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Rate
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={detalProduct?.rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
