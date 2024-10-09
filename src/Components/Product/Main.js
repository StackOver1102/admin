import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import Table from "../Table/Table";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const productList = useSelector((state) => state.products);
  // const { productsStatus } = productList;
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, SetSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);

  // const productDelete = useSelector((state) => state.productDelete);
  // const { error: errorDelete, success: successDelete } = productDelete;

  const handleDelete = async (id) => {
    // Check if an ID is passed
    if (id) {
      // Display a confirmation dialog to the user
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");

      // If the user confirms, proceed with the delete operation
      if (confirmDelete) {
        try {
          // Call the ProductService to delete the product
          await ProductService.deleteProduct(id);

          alert("Ok")
        } catch (error) {
          // Optionally, show an error message
          alert("Error deleting product. Please try again.");
        }
      }
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "ID Nguồn",
      selector: (row) => row.value,
    },
    {
      name: "Nguồn",
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.label,
    },
    {
      name: "Price",
      selector: (row) => row.rate,
    },
    {
      name: "Min",
      selector: (row) => row.min,
    },
    {
      name: "Max",
      selector: (row) => row.max,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link
            to={`/product/${row._id}/edit`}
          // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Edit</button>
          </Link>
          <Link
            style={{ marginLeft: "15px" }}
            onClick={() => handleDelete(row._id)}
          // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Delete</button>
          </Link>
        </>

      ),
    },
  ];
  const hangldeGetAll = async () => {
    setLoading(true);
    const resProduct = await ProductService.getAll();
    setLoading(false);
    setTempData(resProduct.data);
  };
  useEffect(() => {

    if (search === "") {
      hangldeGetAll();
    } else {
      const result = tempData.filter((idProduct) => {
        return idProduct.id.toString().match(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : (
            <div className="row">
              <Table data={tempData} columns={columns} sub={true} show={showModal} handleCloseModal={handleCloseModal} handleDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
