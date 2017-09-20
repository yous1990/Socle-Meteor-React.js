import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import ContentHeader from '../content_header';
import {_} from 'lodash';
import { browserHistory } from 'react-router';

class StatisticView extends React.Component{

    constructor(){
        super();
        this.state ={
            firstNameError : "",
            firstNameErrorClass :"",
            lastNameError : "",
            lastNameErrorClass :"",
            usernameError : "",
            usernameErrorClass: "",
            emailError: "",
            emailErrorClass :"",
            birthError:"",
            birthErrorClass:"",
            countryError :"",
            countryErrorClass: "",
            passwordError :"",
            passwordErrorClass:"",
            confirmPasswordError:"",
            confirmPasswordErrorClass:""
        }
    }



handleSubmit(e){

    e.preventDefault();

    var firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
    var lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
    var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var birth = ReactDOM.findDOMNode(this.refs.birthday).value;
    var birthCountry = ReactDOM.findDOMNode(this.refs.birthCountry).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    var confirmpassword = ReactDOM.findDOMNode(this.refs.confirmpassword).value.trim();




    if (firstName.length < 3 ){
        this.setState({
            firstNameError : "First name must be at least 3 caracters",
            firstNameErrorClass : "red-error"
        })
    }else{
        this.setState({
            firstNameError : "",
            firstNameErrorClass : ""
        })
    }

    if (lastName.length < 3){
        this.setState({
            lastNameError: "Last name must contain at least 3 caracters",
            lastNameErrorClass : "red-error"
        })
    }else{
        this.setState({
            lastNameError: "",
            lastNameErrorClass : ""
        })
    }

   if (username.length==0){
         this.setState({
            usernameError: "You must enter a username",
            usernameErrorClass : "red-error"
        })
   }else{
    usernameCheck = _.find(this.props.users,{username:username});

    if(usernameCheck != null){
        this.setState({
            usernameError: "this username is already taken",
            usernameErrorClass : "red-error"
        })
    }else{
        this.setState({
            usernameError: "",
            usernameErrorClass : ""
        })
    }
   }


    if(!this.validateEmail(email)){
        this.setState({
            emailError: "Please enter a correct email",
            emailErrorClass : "red-error"
    })
  }else{
    data  = [];
    data[0] = {
        address : email

    }

    emailCheck = _.find(this.props.users,{emails:data});
    //console.log(emailCheck)

    if(emailCheck != null){
        this.setState({
            emailError: "this email is already taken",
            emailErrorClass : "red-error"
        })
    }else{
        this.setState({
            emailError: "",
            emailErrorClass : ""
        })

    }

    }

    if (birth===""){
        this.setState({
            birthError: "Please enter your birthday",
            birthErrorClass : "red-error"
        })
    }else{
        this.setState({
            birthError: "",
            birthErrorClass : ""
        })
    }


    if (birthCountry.length===0){
        this.setState({
            countryError: "Please enter your birthday",
            countryErrorClass : "red-error"
        })
    }else{
        this.setState({
            countryError: "",
            countryErrorClass : ""
        })
    }

    if(!this.validatePassword(password)){
         this.setState({
            passwordError: "Password must contain at least 8 caracters : 1 uppercase, 1 lowercase ,1 number",
            passwordErrorClass : "red-error"
        })
    }else{
        this.setState({
            passwordError: "",
            passwordErrorClass : ""
        })
    }
    if(confirmpassword === password ){
         this.setState({
            confirmPasswordErrorpasswordError: "not the same password",
            confirmPasswordErrorClass : "red-error"
        })
    }else{
        this.setState({
            confirmPasswordErrorpasswordError: "",
            confirmPasswordErrorClass : ""
        })
    }



    if (
           this.state.firstNameError===""
        && this.state.lastNameError===""
        && this.state.usernameError===""
        && this.state.emailError===""
        && this.state.birthError===""
        && this.state.countryError===""
        && this.state.passwordError===""
        && this.state.confirmPasswordError===""

    ){
         var user = {
          username: username,
          email: email,
          profile : {
            firstName : firstName,
            lastName : lastName,
            birthday : birth,
            birthCountry : birthCountry
          },
          password: password,
          confirmpassword:confirmpassword

        };

        Meteor.call('createUserFromAdmin',user,function(err,result){
              if(!err){
                 console.log("a new user just got created")
                  browserHistory.push('/dashboard/users/');
                }else{
                  console.log("something goes wrong with the following error message " +err.reason )
                }
          })

}




}




validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
}





    render(){

         var buttonStyle = {
            marginTop: "10px",
            borderRadius: "0"
        }

        var formStyle={
            marginBottom : "29px"
        }


        return (
            <div className="statistic-content">
                <ContentHeader
                name="New User"
                description="Add a new user"
                breadcrumb="New User"
                breadcrumbIcon="fa fa-user"
                />
                <section className="content">
                        <div className="box">
                        <form style={formStyle} onSubmit={this.handleSubmit.bind(this)} >
                        <div className="box-header">


                        </div>
                        <div className="box-body">
                           <div className="row">
                               <div className="col-md-5 ">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" ref="firstName" className="form-control" placeholder="Enter first name"/>
                                            <span className={this.state.firstNameErrorClass}>{this.state.firstNameError} </span>
                                        </div>

                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" ref="lastName" className="form-control" placeholder="Enter last name"/>
                                            <span className={this.state.lastNameErrorClass}>{this.state.lastNameError} </span>
                                        </div>


                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" ref="username" className="form-control" placeholder="Enter username"  />
                                            <span className={this.state.usernameErrorClass}>{this.state.usernameError} </span>
                                        </div>

                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="text" ref="email" className="form-control" placeholder="Enter email"  />
                                           <span className={this.state.emailErrorClass}>{this.state.emailError} </span>
                                        </div>

                               </div>
                               <div className="col-md-5 col-md-offset-1">
                                          <div className="form-group">
                                            <label>Birthday</label>
                                            <input type="date" ref="birthday" className="form-control"/>
                                            <span className={this.state.birthErrorClass}>{this.state.birthError} </span>
                                        </div>
                                        <div className="form-group">
                                            <label>Birth country </label>
                                            <input type="text" ref="birthCountry" className="form-control" placeholder="Enter birth Country"  />
                                            <span className={this.state.countryErrorClass}>{this.state.countryError} </span>
                                        </div>

                                        <div className="form-group">
                                            <label>Password </label>
                                            <input type="password"  ref="password" className="form-control" placeholder="Enter password"  />
                                            <span className={this.state.passwordErrorClass}>{this.state.passwordError} </span>
                                        </div>

                                        <div className="form-group">
                                            <label>Confirm Password </label>
                                            <input type="password"  ref="confirmpassword" className="form-control" placeholder="Confirm password"  />
                                            <span className={this.state.confirmPasswordErrorClass}>{this.state.confirmPasswordError} </span>
                                        </div>

                                </div>
                           </div>
                        </div>
                        <div className="box-footer">
                            <input type="submit" style={buttonStyle} className="btn btn-primary" value="Create"/>
                        </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
} ;


StatisticView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {

  Meteor.subscribe('users');

  return {
    users: Meteor.users.find().fetch(),
  };
}, StatisticView);
