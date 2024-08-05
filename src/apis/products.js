import axios from "axios";

// axios.get(
//   "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
// );

const show = slug => axios.get(`products/${slug}`);
const fetch = () => axios.get("products");
const productsApi = { show, fetch };

export default productsApi;
