import axios, { type AxiosResponse } from "axios";

const baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user";

const token = localStorage.getItem("token");
// const headers = { headers: { Authorization: "bearer " + token } };

const headers = { headers: { "x-access-token": token } };
interface GetCart {
  success: string;
  messgae: string;
  result: [
    {
      product_id: {
        description: string;
        discountPrice: number;
        bookImage: string | any;
        _id: string;
        admin_user_id: string;
        bookName: string;
        author: string;
        quantity: number;
        price: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
      quantityToBuy: number;
      _id: string;
      user_id: {
        address: Array<any>;
        isVerified: boolean;
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
      };
    }
  ];
}

export const getCart = async (): Promise<AxiosResponse<GetCart>> => {
  const res = await axios.get(`${baseUrl}/get_cart_items`, headers);
  console.log(res);
  return res;
};

//
// {
//   "success": true,
//   "message": "Item added to cart",
//   "result": {
//     "product_id": "66d5564ed84c6c000e3b36a9",
//     "quantityToBuy": 1,
//     "_id": "68d2c22156bee9000eba9333",
//     "user_id": "68d11db8b9bfd1000e248cc0",
//     "createdAt": "2025-09-23T15:52:01.750Z",
//     "updatedAt": "2025-09-23T15:52:01.750Z",
//     "__v": 0
//   }

interface AddCart {
  success: boolean;
  message: string;

  result: {
    product_id: string;
    quantityToBuy: number;
    _id: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
export const addCart = async (id: string): Promise<AxiosResponse<AddCart>> => {
  const res = await axios.post(`${baseUrl}/add_cart_item/${id}`, {}, headers);
  console.log(res);
  return res;
};

// update the cart  item:/cart_item_quantity/{cartItem_id}

// {
//   "success": true,
//   "message": "Cart item quantity updated"
// }

// remove item from cart- remove_cart_item/66d55482d84c6c000e3b369e
