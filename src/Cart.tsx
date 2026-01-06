import { useEffect, useState, useRef } from "react";
import { Items } from "./Types";

interface CartInterface {
  items: Items[];
}

export const Cart = ({ items }: CartInterface) => {
  const [isRecalculate, setIsRecalculate] = useState<Set<number>>(new Set());
  const [orderList, setOrderList] = useState<Items[]>([]);
  const timeOut = useRef<{ [id: number]: any }>({});

  const onChange = (item: Items, quantity: number) => {
    console.log(isRecalculate);

    if (timeOut.current[item.orderId]) {
      clearTimeout(timeOut.current[item.orderId]);
    }
    timeOut.current[item.orderId] = setTimeout(() => {
      setOrderList((prev) =>
        prev.map((value) => {
          if (value.orderId === item.orderId) {
            value.totalPrice = item.price * quantity;
            return value;
          }
          return value;
        })
      );
      setIsRecalculate((prev) => {
        const newSet = prev;
        newSet.delete(item.orderId);
        return newSet;
      });
    }, 2000);
  };

  useEffect(() => {
    setOrderList(items);
  }, [isRecalculate]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th key="OrderId">OrderId</th>
            <th key="Product">Product</th>
            <th key="Quantity">Quantity</th>
            <th key="Price">Price</th>
            <th key="Total-Price">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((data) => {
            return (
              <tr key={data.product}>
                <td>{data.orderId}</td>
                <td>{data.product}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Edit your quantity here"
                    onChange={(e) => {
                      setIsRecalculate((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(data.orderId);
                        return newSet;
                      });
                      onChange(data, Number(e.target.value));
                    }}
                  />
                </td>
                <td>{data.price}</td>
                <td>
                  {isRecalculate.has(data.orderId)
                    ? "recalculating..."
                    : data.totalPrice}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
