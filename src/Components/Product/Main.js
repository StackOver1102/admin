import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/LoadingError";
import Message from "../LoadingError/Error";
import DataTable from "react-data-table-component";
import * as ProductService from "../../Services/ProductService";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const productList = useSelector((state) => state.products);
  // const { productsStatus } = productList;
  const [tempData, setTempData] = useState([]);

  const [search, SetSearch] = useState("");

  // const productDelete = useSelector((state) => state.productDelete);
  // const { error: errorDelete, success: successDelete } = productDelete;

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.thumbnail}
          alt={row.title}
          class="img-thumbnail"
          style={{ maxWidth: "50%" }}
        />
      ),
    },
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "DiscountPercentage",
      selector: (row) => row.discountPercentage,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/product/${row._id}/edit`}
          // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
        >
          <button className="btn btn-primary">Edit</button>
        </Link>
      ),
    },
  ];
  const hangldeGetAll = async () => {
    setLoading(true);
    const resProduct = await ProductService.getAll();
    setLoading(false);
    setTempData(resProduct);

    // dispatch(updatePay(res));
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
              <DataTable
                columns={columns}
                data={tempData}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                progressComponent
                selectableRows
                selectableRowsHighlight
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="Search by id"
                    className="w-25 form-control"
                    value={search}
                    onChange={(e) => {
                      SetSearch(e.target.value);
                    }}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
