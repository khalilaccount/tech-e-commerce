import {
  FaTachometerAlt,
  FaBox,
  FaPlusCircle,
  FaShoppingCart,
  FaCubes,
} from "react-icons/fa";

export const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: FaTachometerAlt,
  },
  {
    id: 2,
    name: "Products",
    path: "/admin/products",
    icon: FaBox,
  },
  {
    id: 3,
    name: "Add Product",
    path: "/admin/add-product",
    icon: FaPlusCircle,
  },
  {
    id: 4,
    name: "Orders",
    path: "/admin/orders",
    icon: FaShoppingCart,
  },
  {
    id: 5,
    name: "Items",
    path: "/admin/items",
    icon: FaCubes,
  },
];
