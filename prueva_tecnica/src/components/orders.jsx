import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase";

export default function Orders() {
  const [order, setOrders] = useState([]);
  

  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    console.log('order');
    console.log(order);
  }, [order]);

  function getOrders() {
    const orders = collection(db, "orders");
    getDocs(orders)
      .then((response) => {
        const ordr = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setOrders(ordr);
      })
      .catch((err) => console.log(err.message));
  }




  /* var  orderValues = order.data.items.map(element => element.item_value) */

  return (
    (
      <div>
        {order.map((order) => (
          <li key={order.id}>{order.data.items.length}</li>
        ))}
      
        {order.map((order) => (
          <li key={order.id}>
            {order.data.items.map((item) => item.item_value)}
          </li>
        ))}
      </div>
    )
  );
}
