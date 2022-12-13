//Read about this project in README.md file   for easy understanding of

import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import filtered, { textFilter } from "react-bootstrap-table2-filter";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";

// for new date object is created

const dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
const newdate = day + "-" + month + "-" + year;

// api's for to post and get data

const url = "https://lobster-app-ddwng.ondigitalocean.app/product/add_new";
const productUrl = "https://lobster-app-ddwng.ondigitalocean.app/product/list";

function App() {
  // state declearing
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState([]); // dummy state
  const [userInput, setUserInput] = useState({
    product_name: "",
    original_price: "",
    sale_price: "",
    product_type: "",
    description: "",
  });

  // handing user input feilds
  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
      date_n_time: newdate,
      __id: userInput.product_name.length,
    });
  };

  //submitting user input data to server
  const submitProductDetails = (e) => {
    e.preventDefault();
    console.log(userInput);
    axios
      .post(
        url,
        {
          product_name: userInput.product_name,
          original_price: userInput.original_price,
          sale_price: userInput.sale_price,
          product_type: userInput.product_type,
          description: userInput.description,
          date_n_time: userInput.date_n_time,
        },
        {
          headers: {
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH", //apikey for post
          },
        }
      )
      .then((response) => {
        console.log(response);
        getAllData();
        alert("Product Created Successfully");
        setUserInput({
          product_name: "",
          original_price: "",
          sale_price: "",
          product_type: "",
          description: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    axios
      .get(productUrl, {
        headers: { api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH" }, // api key  for get data
      })
      .then((response) => {
        setProduct(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const dateFormatter = (product, row) => {
    let apidate = product;
    let timestamp = new Date(apidate).getTime();
    let Day = new Date(timestamp).getDate();
    let Month = new Date(timestamp).getMonth() + 1;
    let Year = new Date(timestamp).getFullYear();
    return (
      <>
        {Day}-{Month}-{Year}
      </>
    );
  };

  //React Bootstrap Table is used for to represent data in ui in form of tables is easy to write in tables

  const columns = [
    {
      dataField: "_id",
      text: "Sno",
      headerStyle: { color: "#fff" },
    },

    {
      dataField: "date_n_time",
      text: "Date and Time",
      sort: true,
      formatter: dateFormatter,
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "_id",
      text: "Product ID",
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "product_name",
      text: "Name",
      sort: true,
      filter: textFilter(search),
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "original_price",
      text: "Original Price",
      sort: true,
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "sale_price",
      text: "Sale Price",
      sort: true,
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "product_type",
      text: "Product Type",
      sorted: true,
      headerStyle: { color: "#fff" },
    },
    {
      dataField: "description",
      text: "Description",
      filter: textFilter(),
      sorted: true,
      headerStyle: { color: "#fff" },
    },
  ];
  const rowStyle = { backgroundColor: "##101339", color: "#fff" };

  return (
    <div className="App">
      <div className="ProductFormCard__Container ">
        <h2 className="mt-5">Create New Product</h2>
        <div className="card-body  ">
          <form onSubmit={submitProductDetails}>
            <div className="form-row ">
              <div className="col m-3 form-field">
                <input
                  type="text"
                  required={true}
                  className="form-control"
                  placeholder="Product name"
                  name="product_name"
                  value={userInput.product_name}
                  onChange={handleInput}
                />
              </div>
              <div className="col m-3">
                <input
                  type="number"
                  required={true}
                  className="form-control"
                  placeholder="Original Price"
                  name="original_price"
                  value={userInput.original_price}
                  onChange={handleInput}
                />
              </div>
              <div className="col m-3">
                <input
                  type="number"
                  required={true}
                  className="form-control"
                  placeholder="Sale Price"
                  name="sale_price"
                  value={userInput.sale_price}
                  onChange={handleInput}
                />
              </div>
              <div className="col m-3">
                <input
                  type="number"
                  required={true}
                  className="form-control"
                  placeholder="Product Type"
                  name="product_type"
                  value={userInput.product_type}
                  onChange={handleInput}
                />
              </div>
              <div className="col m-3">
                <textarea
                  type="text"
                  required={true}
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={userInput.description}
                  onChange={handleInput}
                />
              </div>
              <div className="col m-3">
                <input
                  type="submit"
                  className="btn btn-primary  w-100 "
                  value="Create"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="line" />
      <div className="ProductsTable__Container">
        <div className="d-flex flex-row justify-content-between m-5">
          <p className="all-products-heading">All Products </p>

          <div className="d-flex flex-row">
            <input
              type="text"
              placeholder="search"
              className="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button">
              <img
                className="search-img"
                alt="search-imgae"
                src="https://cdn-icons-png.flaticon.com/512/3917/3917754.png"
              />
            </button>
          </div>
        </div>
        <div className="product-card card-container m-5 ">
          <BootstrapTable
            bootstrap4
            keyField="_id"
            data={product}
            columns={columns}
            condensed
            pagination={paginationFactory()}
            filter={filtered()}
            headerClasses="header-class"
            rowStyle={rowStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
