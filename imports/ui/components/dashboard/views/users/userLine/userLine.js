import React, { PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import { browserHistory } from 'react-router';

export default class UserLine extends React.Component{
  
  delete(e){
    e.preventDefault();
        this.props.deleteUser(this.props.item);
  }

  redirect(e){
       e.preventDefault();
    browserHistory.push('/dashboard/users/edit/'+this.props.item._id);
  }
  
  render(){


    var tableBodyItems = [];
    console.log(this.props.item.createdAt,this.props.item.profile.firstName);

    if(this.props.displayParams.firstName){
      tableBodyItems.push(
        <td key="firstNameItem">
          {this.props.item.profile.firstName}
        </td>
      );
    }
    if(this.props.displayParams.lastName){
      tableBodyItems.push(
        <td key="lastNameItem">
          {this.props.item.profile.lastName}
        </td>
      );
    }
    if(this.props.displayParams.username){
      tableBodyItems.push(
        <td key="usernameItem">
          {this.props.item.username}
        </td>
      );
    }
    if(this.props.displayParams.email){
      tableBodyItems.push(
        <td key="emailItem">
          {this.props.item.emails[0].address}
        </td>
      );
    }
    if(this.props.displayParams.joined){
      if(this.props.item.createdAt!=null){
      tableBodyItems.push(
        <td key="joinedItem">
          {this.props.item.createdAt.toDateString()}
        </td>
      );
      }
    }



    return (  
      <tr>
        {tableBodyItems}
        <td>
          <a onClick={this.redirect.bind(this)} className="hidden-xs btn btn-xs btn-primary">
              <i className="fa fa-pencil"></i>
              </a>
        </td>
        <td>
          <a onClick={this.delete.bind(this)} className="hidden-xs btn btn-xs btn-danger btn-delete"><i className="fa fa-times"></i></a>
        </td>
      </tr>
      
    );
  }
}
