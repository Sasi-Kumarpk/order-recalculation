import { Items } from "./Types";

export const mockData = (): Promise<Items[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const data: Items[] = [
        {
          orderId: 1,
          product: "shampoo",
          quantity: 1,
          price: 50,
          totalPrice: 50,
        },
        {
          orderId: 2,
          product: "brush",
          quantity: 1,
          price: 10,
          totalPrice: 10,
        },
      ];
      resolve(data);
    }, 1000);
  });

export const reCaluculateApi = (items: Items): Promise<Items> =>
  new Promise((resolve) => {
    setTimeout(() => {
      let data = items;
      data.price = data.price * data.quantity;
      resolve(data);
    }, 1000);
  });
