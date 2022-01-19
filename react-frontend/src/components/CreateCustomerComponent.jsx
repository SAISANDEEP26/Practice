import React, { Component } from 'react'
import CustomerService from '../services/CustomerService';

class CreateCustomerComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            id: this.props.match.params.id,
            name: '',
            phoneNumber: '',
            email: '',
            address: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.saveOrUpdateCustomer = this.saveOrUpdateCustomer.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            CustomerService.getCustomerById(this.state.id).then( (res) =>{
                let customer = res.data;
                this.setState({name: customer.name,
                    phoneNumber: customer.phoneNumber,
                    email: customer.email,
                    address : customer.address
                });
            });
        }        
    }
    saveOrUpdateCustomer = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            let customer = {name: this.state.name, phoneNumber: this.state.phoneNumber, email:this.state.email, address: this.state.address};
            console.log('customer => ' + JSON.stringify(customer));

            if(this.state.id === '_add'){
                CustomerService.createCustomer(customer).then(res =>{
                    this.props.history.push('/customers');
                });
            }else{
                CustomerService.updateCustomer(customer, this.state.id).then( res => {
                    this.props.history.push('/customers');
                });
            }
        }
    }

    handleValidation() {
        let cname = this.state.name;
        let cphone = this.state.phoneNumber;
        let cemail = this.state.email;
        let caddress = this.state.address;
        let errors = {};
        let formIsValid = true;
    
        if (!cname) {
            formIsValid = false;
            errors["name"] = "Name cannot be empty";
        }
        else if (typeof cname !== "undefined") {
          if (!cname.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["name"] = "Enter a valid Name";
          }
        }

        if (!cphone) {
            formIsValid = false;
            errors["phoneNumber"] = "Phone Number cannot be empty";
        }
        else if (typeof cphone !== "undefined") {
            if (!cphone.match(/^\d{10}$/)) {
              formIsValid = false;
              errors["phoneNumber"] = "Enter a valid Phone Number";
            }
        }

        if (!cemail) {
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
        }
        else if (typeof cemail !== "undefined") {
            if (!cemail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
              formIsValid = false;
              errors["email"] = "Enter a valid Email";
            }
        }

        if (!caddress) {
            formIsValid = false;
            errors["address"] = "Address cannot be empty";
        }
    
    
        this.setState({ errors: errors });
        return formIsValid;
      }
    
    
    changeFirstNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    cancel(){
        this.props.history.push('/customers');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Customer</h3>
        }else{
            return <h3 className="text-center">Update Customer</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Customer Name: </label>
                                            <input placeholder="Customer Name" ref="name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeFirstNameHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Phone Number: </label>
                                            <input placeholder="Customer Phone Number" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Address: </label>
                                            <input placeholder="Customer Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
                                        </div>
                                        <div className = "form-group">
                                            <label> Customer Email: </label>
                                            <input placeholder="Customer Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateCustomer}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCustomerComponent
