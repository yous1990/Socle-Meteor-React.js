import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import ContentHeader from '../content_header';
import {_} from 'lodash';



class StatisticView extends React.Component{
    

        constructor(){
            super();
            this.state = {
                messageFirstName : "",
                messageLastName : "",
            }
        }




    handleSubmit(e){
        e.preventDefault();
        var thisUserId = this.props.params.id;
        var firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
        var lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
        var birth = ReactDOM.findDOMNode(this.refs.birthday).value;
        var birthCountry = ReactDOM.findDOMNode(this.refs.birthCountry).value.trim();
        user = _.find(this.props.users,{_id:thisUserId});
        var data = user.profile;
        
        
        if(firstName!=""){
            if (firstName.length < 3){
                this.setState({
                    messageFirstName : "First name must be more than 3 caracters"
                },function(){
                    this.setState({
                        messageFirstNameClass : "alert alert-danger"
                    })
                })
            }else{
                this.setState({
                    messageFirstName : ""
                },function(){
                    this.setState({
                        messageFirstNameClass : ""
                    })
                })
                data.firstName = firstName;
            }
        }else{
                this.setState({
                    messageFirstName : ""
                },function(){
                    this.setState({
                        messageFirstNameClass : ""
                    })
                })
        }



        if(lastName!=""){
             if (lastName.length < 3){
                this.setState({
                    messageLastName : "Last name must be more than 3 caracters"
                },function(){
                    this.setState({
                        messageLastNameClass : "alert alert-danger"
                    })
                })
            }else{
                this.setState({
                    messageLastName : ""
                },function(){
                    this.setState({
                        messageLastNameClass : ""
                    })
                })
                data.lastName = lastName;   
            }
        }else{
                this.setState({
                    messageLastName : ""
                },function(){
                    this.setState({
                        messageLastNameClass : ""
                    })
                })
            }





        if(birth!=""){
            data.birthday = birth;
        }
        if (birthCountry != ""){
           data.birthCountry = birthCountry;
        }


        this.setState({
                successMessage : "User Updated"
            },function(){
                this.setState({
                    successMessageClass : "alert alert-success"
                })
            })
            Meteor.users.update({_id:thisUserId}, {$set:{profile : data}}); 
        
        
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
                name="Edit User"
                description=" "
                breadcrumb="Edit User"
                breadcrumbIcon="fa fa-user"
                />
                <section className="content">
                    <div className="box">
                        <form style={formStyle} onSubmit={this.handleSubmit.bind(this)} >
                        <div className="box-header">
                            
                            
                            
                            <div className={this.state.messageFirstNameClass}>
                                {this.state.messageFirstName}
                            </div>


                            <div className={this.state.messageLastNameClass}>
                                {this.state.messageLastName}
                            </div>
                        </div>
                        <div className="box-body">
                           <div className="row">
                               <div className="col-md-5 ">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" ref="firstName" className="form-control" placeholder="Enter first name"/>
                                        </div>
                                   
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" ref="lastName" className="form-control" placeholder="Enter last name"/>
                                        </div>

                                        <div className="form-group">
                                            <label>Email address</label>
                                            <input type="email" className="form-control" placeholder="Enter email" disabled />                                            
                                        </div>           
                                           
                               </div>
                               <div className="col-md-5 col-md-offset-1">               
                                          <div className="form-group">
                                            <label>Birthday</label>
                                            <input type="date" ref="birthday" className="form-control"/>
                                        </div>
                                           <div className="form-group">
                                            <label>Birth country </label>
                                            <input type="text" ref="birthCountry" className="form-control" placeholder="Enter email"  />                                            
                                        </div>       

                                </div>
                           </div>
                        </div>
                        <div className="box-footer">
                            <input type="submit" style={buttonStyle} className="btn btn-primary" value="Update"/>
                        </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }
};


StatisticView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default createContainer(() => {
  /**
   * Add subscription here
   */
  Meteor.subscribe('users');

  return {
    users: Meteor.users.find().fetch(),
  };
}, StatisticView);


//export default StatisticView;
