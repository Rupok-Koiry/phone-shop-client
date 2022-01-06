import React, { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import classes from "../Table.module.css";
const ManageProduct = () => {
  const [phones, setPhones] = useState([]);

  const loadAllPhones = useCallback(async () => {
    const response = await fetch(
      `https://guarded-hamlet-19613.herokuapp.com/phones`
    );
    const responseData = await response.json();
    setPhones(responseData);
  }, []);

  // Load all phones
  useEffect(() => {
    loadAllPhones();
  }, [loadAllPhones]);

  //Phone delete handler
  const handleDelete = async (_id) => {
    if (window.confirm("Are You sure you want to delete the product?")) {
      const response = await fetch(
        `https://guarded-hamlet-19613.herokuapp.com/phones/${_id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (responseData.deletedCount > 0) {
        loadAllPhones();
      }
    }
  };
  console.log(phones);
  //Phone id counter
  let count = 1;

  //Manage product page
  return (
    <section className={classes.orders}>
      <h2 className="section-heading display-4 m-0">All Smartphones</h2>
      <div className="separator-2"></div>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-lg-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              <div className={classes["overflow-x"]}>
                <table
                  style={{ width: "100%" }}
                  className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>ID</th>
                      <th style={{ minWidth: "50px" }}>Image</th>
                      <th style={{ minWidth: "200px" }}>Phone Name</th>
                      <th style={{ minWidth: "200px" }}>Processor</th>
                      <th style={{ minWidth: "150px" }}>ScreenSize</th>
                      <th style={{ minWidth: "150px" }}>Battery</th>
                      <th style={{ minWidth: "50px" }}>In Stock</th>
                      <th style={{ minWidth: "120px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phones.map((phone) => {
                      const image = phone.imageCover?.startsWith("phone-")
                        ? `/images/${phone.imageCover}`
                        : phone.imageCover;
                      return (
                        <tr key={phone._id}>
                          <td>{count++}</td>
                          <td>
                            <img
                              src={image}
                              alt={phone.name}
                              className="img-fluid rounded me-2"
                              width="40"
                            />
                          </td>
                          <td>{phone.name}</td>
                          <td>{phone.processor}</td>
                          <td>{phone.screenSize}</td>
                          <td>{phone.battery}</td>
                          <td>{phone.inStock}</td>

                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              ${phone.price}
                            </span>
                          </td>

                          <td>
                            <MdDelete
                              className={classes.delete}
                              onClick={() => handleDelete(phone._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
