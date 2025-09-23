import axios, { type AxiosResponse } from "axios";

const baseUrl = "https://bookstore.incubation.bridgelabz.com/bookstore_user";

// addd wishlist -add_wish_list/66d55482d84c6c000e3b369e

// {
//   "success": true,
//   "message": "Item added to wish list",
//   "result": {
//     "product_id": "66d55482d84c6c000e3b369e",
//     "_id": "68d2c7f956bee9000eba9336",
//     "user_id": "68d11db8b9bfd1000e248cc0",
//     "createdAt": "2025-09-23T16:16:57.984Z",
//     "updatedAt": "2025-09-23T16:16:57.984Z",
//     "__v": 0
//   }
// }

// get wishlist  -get_wishlist_items

// {
//   "success": true,
//   "message": "Sucessfully fetched all wish list items",
//   "result": [
//     {
//       "product_id": {
//         "description": "Nothingg",
//         "discountPrice": 200,
//         "bookImage": null,
//         "_id": "66d55482d84c6c000e3b369e",
//         "bookName": "Moonlight",
//         "author": "Sunburn",
//         "quantity": 4,
//         "price": 300,
//         "createdAt": "2024-09-02T06:00:34.547Z",
//         "updatedAt": "2024-09-02T06:00:34.547Z",
//         "__v": 0
//       },
//       "_id": "68d2c7f956bee9000eba9336",
//       "user_id": "68d11db8b9bfd1000e248cc0",
//       "createdAt": "2025-09-23T16:16:57.984Z",
//       "updatedAt": "2025-09-23T16:16:57.984Z",
//       "__v": 0
//     }
//   ]
// }

// remove wishlist - remove_wishlist_item/66d55482d84c6c000e3b369e
// {
//   "success": true,
//   "message": "Product removed from wish list sucessfully"
// }
