import React, { useCallback, useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../../store/auth-context";
import classes from "../Table.module.css";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const {
    user: { email },
  } = useContext(AuthContext);

  const loadUserOrders = useCallback(async () => {
    const response = await fetch(
      `https://guarded-hamlet-19613.herokuapp.com/orders/${email}`
    );
    const responseData = await response.json();
    setOrders(responseData);
  }, [email]);

  // Load user orders
  useEffect(() => {
    loadUserOrders();
  }, [email, loadUserOrders]);

  //Order delete handler
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
        loadUserOrders();
      }
    }
  };
  //Order id counter
  let count = 1;
  //My order page
  return (
    <section className={classes.orders}>
      <h2 className="section-heading display-4 m-0">My Orders</h2>
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
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "350px" }}>Phone Name</th>
                      <th style={{ minWidth: "50px" }}>Ram</th>
                      <th style={{ minWidth: "50px" }}>Rom</th>
                      <th style={{ minWidth: "90px" }}>Price</th>
                      <th style={{ minWidth: "120px" }}>Status</th>
                      <th style={{ minWidth: "80px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const image = order.imageCover?.startsWith("phone-")
                        ? `/images/${order.imageCover}`
                        : order.imageCover;
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
                            <img
                              src={image}
                              alt={order.name}
                              className="img-fluid rounded me-3"
                              width="40"
                            />
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              {order.name}
                            </span>
                          </td>
                          <td>{order.ram}GB</td>
                          <td>{order.rom}GB </td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              ${order.price}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`${classes.mode} ${
                                order.status === "Shipped"
                                  ? classes.mode_on
                                  : classes.mode_off
                              }`}
                            >
                              {order.status === "pending" && "Pending"}
                              {order.status === "shipped" && "Shipped"}
                            </span>
                          </td>
                          <td>
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

export default MyOrders;
