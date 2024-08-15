import axios from "axios";

const create = payload => axios.post("orders", payload);

const ordersApi = { create };

export default ordersApi;

//create method to execute thepost request
