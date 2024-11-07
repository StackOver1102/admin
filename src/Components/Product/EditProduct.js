import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles


const EditProductMain = (props) => {
  const { id } = props;

  const [rate, setRate] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [description, setDescription] = useState(""); // New state for description
  const [detalProduct, setDetail] = useState();
  const [showLoader, setShowLoader] = useState(false)
  const [loading, setLoading] = useState(true);
  const toastId = React.useRef(null);
  const Toastobjects = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const handleGetDetailsProduct = async (id) => {
    try {
      const res = await ProductService.getDetilsProduct(id);
      if (res && res.data) {
        setRate(res.data.rate);
        setMin(res.data.min);
        setMax(res.data.max);

        setDescription(res.data.description || ""); // Set initial description value
      } else {
        setDetail({});
      }
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ handleGetDetailsProduct ~ error:", error);
    }
  };
  // const mutation = useMutationHooks((data) => {
  //   const { id, access_token, ...rests } = data;
  //   ProductService.updateProduct(id, rests, access_token);
  // });

  const mutation = useMutationHooks(
    async (data) => {
      try {
        const { id, access_token, ...rests } = data;
        return await ProductService.updateProduct(id, rests, access_token);
      } catch (error) {
        throw error
      }
    },
    {
      onMutate: () => {
        setShowLoader(true);
      },
      onSuccess: async (data) => {
        setShowLoader(false);
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.success("Thành công", Toastobjects);
        }
      },
      onError: (error) => {
        setShowLoader(false);

        // Extract the error message from the error object
        const errorMessage = error?.message || "Create Failed";
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.error(errorMessage, Toastobjects);
        }
        // Show the error message in the toast
        // showErrorToast(`Login failed: ${errorMessage}`);
      },
      onSettled: () => {
        setShowLoader(false);
      },
    }
  );
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();

      await mutation.mutateAsync({
        id: id,
        rate,
        min,
        max,
        description, // Pass the description to the update function
      });
    } catch (error) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
    }
  };

  useEffect(() => {
    handleGetDetailsProduct(id);
  }, [id]);


  return (
    <>
      <Toast />
      {showLoader && <Loading/>}
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

          {loading ? (
            <Loading />
          ) : (
            <div className="row mb-4">
              <div className="col-xl-12 col-lg-12">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    {/* Error Loading */}
                    {false && <Message variant="alert-danger">error</Message>}

                    <div className="mb-4">
                      <label htmlFor="product_rate" className="form-label">
                        Rate
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_rate"
                        required
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_min" className="form-label">
                        Min
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_min"
                        required
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_max" className="form-label">
                        Max
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_max"
                        required
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_description" className="form-label">
                        Description
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        placeholder="Enter product description here..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
