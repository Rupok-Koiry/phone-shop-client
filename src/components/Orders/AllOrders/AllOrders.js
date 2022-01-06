import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import classes from "../Table.module.css";
const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    const response = await fetch(
      "https://guarded-hamlet-19613.herokuapp.com/orders"
    );
    const responseData = await response.json();
    setOrders(responseData);
  };

  //Load all orders
  useEffect(() => {
    loadOrders();
  }, []);
  //Delete order handler
  const handleDelete = async (_id) => {
    if (window.confirm("Are You sure you want to delete the order?")) {
      const response = await fetch(
        `https://guarded-hamlet-19613.herokuapp.com/orders/${_id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (responseData.deletedCount > 0) {
        loadOrders();
      }
    }
  };
  //Shipped order handler
  const handleShipped = async (_id) => {
    const response = await fetch(
      `https://guarded-hamlet-19613.herokuapp.com/orders/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "shipped" }),
      }
    );
    const responseData = await response.json();
    if (responseData.ok > 0) {
      loadOrders();
    }
  };
  let count = 1;
  return (
    <section className={classes.orders}>
      <h2 className="section-heading display-4 m-0">All Orders</h2>
      <div className="separator-2"></div>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              <div className={classes["overflow-x"]}>
                <table
                  style={{ width: "100%" }}
                  className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>ID</th>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "280px" }}>Email</th>
                      <th style={{ minWidth: "280px" }}>Product Name</th>
                      <th style={{ minWidth: "80px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Status</th>
                      <th style={{ minWidth: "250px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      console.log("Hello", order.userImage);
                      return (
                        <tr key={order._id}>
                          <td>{count++}</td>
                          <td>
                            <img
                              src={order.userImage}
                              alt={order.userName.split(" ")[0]}
                              className="img-fluid rounded-circle me-2"
                              width="40"
                            />
                            {order.userName}
                          </td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              {order.email}
                            </span>
                          </td>
                          <td>{order.name}</td>
                          <td>${order.price}</td>
                          <td>
                            <span
                              className={`${classes.mode} ${
                                order.status === "shipped"
                                  ? classes.mode_on
                                  : classes.mode_off
                              }`}
                            >
                              {order.status === "pending" && "Pending"}
                              {order.status === "shipped" && "Shipped"}
                            </span>
                          </td>
                          <td>
                            {order.status === "pending" && (
                              <button
                                className={`btn btn-sm me-3 ${classes.mark}`}
                                onClick={() => handleShipped(order._id)}
                              >
                                Mark as Shipped
                              </button>
                            )}
                            <MdDelete
                              className={classes.delete}
                              onClick={() => handleDelete(order._id)}
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

export default ManageAllOrders;
