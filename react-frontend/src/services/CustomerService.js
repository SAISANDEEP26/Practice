import axios from 'axios';

const CUSTOMER_API_BASE_URL = "http://localhost:8102/getall";
const CUSTOMER_API_CREATE_URL = "http://localhost:8102/create";
const CUSTOMER_API_GETBYID_URL = "http://localhost:8102/getbyid";
const CUSTOMER_API_DELETE_URL = "http://localhost:8102/delete";
const CUSTOMER_API_UPDATE_URL = "http://localhost:8102/update";
class CustomerService {

    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL);
    }

    createCustomer(customer){
        return axios.post(CUSTOMER_API_CREATE_URL, customer);
    }

    getCustomerById(customerId){
        return axios.get(CUSTOMER_API_GETBYID_URL + '/' + customerId);
    }

    updateCustomer(customer, customerId){
        return axios.put(CUSTOMER_API_UPDATE_URL + '/' + customerId, customer);
    }

    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_API_DELETE_URL + '/' + customerId);
    }
}

export default new CustomerService()