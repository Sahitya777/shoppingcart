"use client";
import React, { useEffect, useState } from "react";

const ProductSection = () => {
  const PRODUCTS = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ];
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
  const THRESHOLD = 1000;
  const [cartitems, setCartItems] = useState([
    { id: 1, name: "Laptop", price: 500, itemsIncart: 0 },
    { id: 2, name: "Smartphone", price: 300, itemsIncart: 0 },
    { id: 3, name: "Headphones", price: 100, itemsIncart: 0 },
    { id: 4, name: "Smartwatch", price: 150, itemsIncart: 0 },
  ]);
  const [totalPrice, settotalPrice] = useState(0);
  const progress = Math.min((totalPrice / THRESHOLD) * 100, 100);
  const remainingAmount = Math.max(THRESHOLD - totalPrice, 0);

  useEffect(() => {
    try {
      let price = 0;
      cartitems.map((item) => {
        price += item.itemsIncart * item.price;
      });
      settotalPrice(price);
    } catch (error) {
      console.log(error, "err in calc");
    }
  }, [cartitems]);

  return (
    <div className="mt-4 px-48 w-full">
      <div className="flex items-center w-full justify-center text-2xl text-black">
        Shopping Cart App
      </div>
      <div className="flex flex-col items-start w-full text-black mt-4">
        <div className="text-gray-600 text-xl font-semibold">Products</div>
        <div className="flex gap-4 mt-2">
          {PRODUCTS.map((product: any, index: number) => (
            <div className="flex flex-col gap-2 bg-white p-2 rounded-md min-w-[200px]">
              <div>{product.name}</div>
              <div>₹{product.price}</div>
              {cartitems.find((item) => item.id === product.id)?.itemsIncart ===
              0 ? (
                <button
                  className="w-full bg-blue-500 p-1 cursor-pointer rounded-md"
                  onClick={() => {
                    setCartItems((prevItems) =>
                      prevItems.map((cartItem) =>
                        cartItem.id === product.id
                          ? {
                              ...cartItem,
                              itemsIncart: cartItem.itemsIncart + 1,
                            }
                          : cartItem
                      )
                    );
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex gap-4 items-center">
                  <div
                    className="flex w-full justify-between cursor-pointer rounded-md px-4 py-1 bg-green-500 text-black"
                    onClick={() => {
                      setCartItems((prevItems) =>
                        prevItems.map((item) =>
                          item.id === product.id
                            ? { ...item, itemsIncart: item.itemsIncart + 1 }
                            : item
                        )
                      );
                    }}
                  >
                    +
                  </div>
                  <div>
                    {
                      cartitems.find((item) => item.id === product.id)
                        ?.itemsIncart
                    }
                  </div>
                  <div
                    className="flex w-full justify-between cursor-pointer rounded-md px-4 py-1 bg-red-500 text-black"
                    onClick={() => {
                      setCartItems((prevItems) =>
                        prevItems.map((item) =>
                          item.id === product.id
                            ? { ...item, itemsIncart: item.itemsIncart - 1 }
                            : item
                        )
                      );
                    }}
                  >
                    -
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-gray-600 mt-4 font-semibold w-full">
          <div className="text-xl">Cart Summary</div>
          <div className="flex flex-col bg-white p-2 rounded-md w-full text-black">
            <div className="w-full flex justify-between mt-2 border-b pb-2">
              <div>Subtotal:</div>
              <div>₹{totalPrice}</div>
            </div>
            {totalPrice < THRESHOLD ? (
              <div className="bg-blue-100 mt-2 rounded-md p-2 flex flex-col">
                <div>
                  Add ₹{remainingAmount} more to get a FREE Wireless Mouse!
                </div>
                <div className="bg-gray-300 rounded-full w-full">
                  <div
                    className="w-full bg-blue-600 transition-all duration-500 rounded-full h-3"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-md">You got a free WIRELESS MOUSE!</div>
            )}
          </div>
        </div>
        {totalPrice === 0 ? (
          <div className="flex flex-col justify-center items-center p-4 w-full bg-white rounded-md mt-4 gap-2 text-gray-400">
            <div className="text-lg font-semibold">Your Cart is Empty</div>
            <div>Add some products to see here</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-gray-600 mt-4 font-semibold w-full">
            <div className="text-xl">Cart Items</div>
            <div className="flex flex-col gap-3">
              {cartitems
                .filter((cartItem) => cartItem.itemsIncart > 0)
                .map((cartItem) => (
                  <div className="flex w-full justify-between items-center bg-white p-2 rounded-md">
                    <div className="flex flex-col">
                      <div className="text-black">{cartItem.name}</div>
                      <div className="text-gray-500 text-sm">
                        ₹{cartItem.price} x {cartItem.itemsIncart} = ₹
                        {cartItem.itemsIncart * cartItem.price}
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div
                        className="flex w-full justify-between cursor-pointer rounded-md px-4 py-1 bg-green-500 text-black"
                        onClick={() => {
                          setCartItems((prevItems) =>
                            prevItems.map((item) =>
                              item.id === cartItem.id
                                ? { ...item, itemsIncart: item.itemsIncart + 1 }
                                : item
                            )
                          );
                        }}
                      >
                        +
                      </div>
                      <div>
                        {
                          cartitems.find((item) => item.id === cartItem.id)
                            ?.itemsIncart
                        }
                      </div>
                      <div
                        className="flex w-full justify-between cursor-pointer rounded-md px-4 py-1 bg-red-500 text-black"
                        onClick={() => {
                          setCartItems((prevItems) =>
                            prevItems.map((item) =>
                              item.id === cartItem.id
                                ? { ...item, itemsIncart: item.itemsIncart - 1 }
                                : item
                            )
                          );
                        }}
                      >
                        -
                      </div>
                    </div>
                  </div>
                ))}
              {totalPrice >= THRESHOLD && (
                <div className="flex w-full items-center justify-between bg-white p-2 rounded-md ">
                  <div className="flex flex-col">
                    <div className="text-black">{FREE_GIFT.name}</div>
                    <div>₹{FREE_GIFT.price} x 1 = ₹0</div>
                  </div>
                  <div className="px-2 h-6 bg-green-300 text-green-800 rounded-full flex items-center uppercase text-sm">
                    Free Gift!
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
