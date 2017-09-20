import React, { PropTypes } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import ContentHeader from '../content_header';

import { Meteor } from 'meteor/meteor';

import UserLine from './userLine/userLine';

import ReactDOM from 'react-dom';

import { _ } from 'lodash';


class StatisticView extends React.Component {


  constructor(props) {

    super(props);


    this.state = {

      searchedText: "",

      currentPage: 0,

      numberOfUsersPerPage: 5,

      nextClass: "paginate_button next",

      previousClass: "paginate_button previous disabled",

      infoDisplayed: {

        firstName: true,

        lastName: true,

        email: true,

        username: true,

        joined: true

      }

    }

  }


  getIntegerValue(floor) {

    value = Math.round(floor);

    if (value < floor) {

      return value + 1;

    } else {

      return value;

    }

  }






  search() {

    var word = ReactDOM.findDOMNode(this.refs.search).value.trim();

    this.setState({

      searchedText: word,

      currentPage: 0

    });

  }


  deleteUser(item) {

    if (item._id === Meteor.userId()) {

      alert("you can't delete this user")

    } else {


      Meteor.users.remove({ _id: item._id })

      Meteor.subscribe('users');

    }


  }


  selectElm(e) {

    var numberOfUsers = e.target.value;

    this.setState({

      currentPage: 0

    }, function () {

      this.setState({

        numberOfUsersPerPage: numberOfUsers

      })

    })

  }


  previous() {

    if (this.state.currentPage > 0) {

      var number = this.state.currentPage - 1;

      this.setState({

        currentPage: number

      }, function () {

        if (this.state.currentPage === 0) {

          this.setState({

            previousClass: "paginate_button previous disabled"

          })

        }

      })

    }



  }


  next() {

    if (this.state.currentPage < this.getIntegerValue(this.props.users.length / this.state.numberOfUsersPerPage) - 1) {

      var number = this.state.currentPage + 1;

      this.setState({

        currentPage: number

      }, function () {

        if (this.state.currentPage === this.getIntegerValue(this.props.users.length / this.state.numberOfUsersPerPage) - 1) {

          this.setState({

            nextClass: "paginate_button next disabled"

          })

        }

        else if (this.state.currentPage > 0) {

          this.setState({

            previousClass: "paginate_button previous"

          })

        }

      })

    } else {

      this.setState({

        nextClass: "paginate_button next disabled"

      })

    }

  }


  changePage(e) {

    var number = e.currentTarget.textContent - 1;

    this.setState({

      currentPage: number

    }, function () {

      if (this.state.currentPage === this.getIntegerValue(this.props.users.length / this.state.numberOfUsersPerPage) - 1) {

        this.setState({

          nextClass: "paginate_button next disabled"

        })

      } else {

        this.setState({

          nextClass: "paginate_button next"

        })

      }

      if (this.state.currentPage === 0) {

        this.setState({

          previousClass: "paginate_button previous disabled"

        })

      } else {

        this.setState({

          previousClass: "paginate_button previous"

        })

      }

    });

  }



  firstNameCheck(e) {

    var newDisplay = this.state.infoDisplayed;

    newDisplay.firstName = e.target.checked

    this.setState({

      infoDisplayed: newDisplay

    })

  }


  LastNameCheck(e) {

    var newDisplay = this.state.infoDisplayed;



    newDisplay.lastName = e.target.checked

    this.setState({

      infoDisplayed: newDisplay

    })

  }


  usernameCheck(e) {

    var newDisplay = this.state.infoDisplayed;

    newDisplay.username = e.target.checked

    this.setState({

      infoDisplayed: newDisplay

    })

  }


  emailCheck(e) {

    var newDisplay = this.state.infoDisplayed;

    newDisplay.email = e.target.checked

    this.setState({

      infoDisplayed: newDisplay

    })

  }


  joinedCheck(e) {

    var newDisplay = this.state.infoDisplayed;

    newDisplay.joined = e.target.checked

    this.setState({

      infoDisplayed: newDisplay

    })

  }





  render() {



    var tableHead = [];

    var userLine;

    var marginStyle = {

      margin: 0

    };

    var pullLeftStyle = {

      display: 'inline-block'

    };

    var userDataSource = []

    var pageNumber;

    var rows = [];

    var active = "paginate_button";

    var dropButStyle ={

      height:"30px",

      borderRadius: "0px",

    }

    var dropStyle = {

      marginLeft : "30px",

      display: 'inline-block'

    }




    if (this.state.infoDisplayed.firstName) {

      tableHead.push(

        <td key="firstName"><b>First Name</b></td>

      );

    }

    if (this.state.infoDisplayed.lastName) {

      tableHead.push(

        <td key="lastName"><b>Last Name</b></td>

      );

    }

    if (this.state.infoDisplayed.username) {

      tableHead.push(

        <td key="username"><b>Username</b></td>

      );

    }

    if (this.state.infoDisplayed.email) {

      tableHead.push(

        <td key="email"><b>Email</b></td>

      );

    }

    if (this.state.infoDisplayed.joined) {

      tableHead.push(

        <td key="joined"><b>Creation Date</b></td>

      );

    }








    if (this.state.searchedText != "") {

      this.props.users.map((item) => {

        if (

          (_.includes(item.profile.firstName.toLowerCase(), this.state.searchedText.toLowerCase()))

          || (_.includes(item.profile.lastName.toLowerCase(), this.state.searchedText.toLowerCase()))

          || (_.includes(item.emails[0].address.toLowerCase(), this.state.searchedText.toLowerCase()))

          || (_.includes(item.username.toLowerCase(), this.state.searchedText.toLowerCase()))

        ) {

          userDataSource.push(item)

        }

        console.log(userDataSource);

      })

    } else {

      userDataSource = this.props.users

    }




    if (userDataSource.length === 0) {

      userLine = "No users were found";

    }

    else {

      userLine = _.chunk(userDataSource, this.state.numberOfUsersPerPage)[this.state.currentPage].map((item) => {

        return (

          <UserLine item={item} displayParams={this.state.infoDisplayed} key={item._id} deleteUser={this.deleteUser.bind(this)} />

        );

      });

    }



    pageNumber = this.getIntegerValue(userDataSource.length / this.state.numberOfUsersPerPage)


    for (var i = 0; i < pageNumber; i++) {

      if (this.state.currentPage === i) {

        active = "paginate_button active";

      }

      else {

        active = "paginate_button";

      }

      rows.push(

        <li className={active} key={i} aria-controls="DataTables_Table_5" tabIndex="0">

          <a onClick={this.changePage.bind(this)} href="#">{i + 1}</a>

        </li>

      );

    }






    return (

      <div className="statistic-content">

        <ContentHeader

          name="View Users"

          description="List of all users"

          breadcrumb="User View"

          breadcrumbIcon="fa fa-users"

          />


        <section className="content">

          <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">

            <div className="box">

              <div className="box-header">

                <div className="box-toolbar">



                  <div className="pull-left">

                    <div>

                      <div  className="dataTables_length" style={pullLeftStyle} id="DataTables_Table_5_length">


                        Page size <span></span>

                      <select onClick={this.selectElm.bind(this)} className="form-control input-sm">

                        <option value="5">5</option>

                        <option value="10">10</option>

                        <option value="25">25</option>

                        <option value="50">50</option>

                        <option value="100">100</option>

                      </select>

                    </div>



                  </div>

                </div>


                {/*<div className="dropdown" style={dropStyle} id="valueItemDrop">

                <button style={dropButStyle} className="selectbox" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                Informations

                </button>

                <ul className="dropdown-menu" aria-labelledby="dLabel">

                <li className="checkbox form-group">

                <input type="checkbox" onChange={this.firstNameCheck.bind(this)}  defaultChecked={this.state.infoDisplayed.firstName} id="offset" value="Offset" name="Offset" />

                <label htmlFor="valuePot">First Name</label>

                </li>

                <li className="checkbox form-group">

                <input type="checkbox" id="payback" onChange={this.LastNameCheck.bind(this)}   defaultChecked={this.state.infoDisplayed.lastName} value="Last Name" name="Payback" />

                <label htmlFor="last-name">Last Name</label>

                </li>

                <li className="checkbox form-group">

                <input type="checkbox" id="writeOff" onChange={this.usernameCheck.bind(this)}   defaultChecked={this.state.infoDisplayed.username} value="Username" name="Write-off" />

                <label htmlFor="username">Username</label>

                </li>

                <li className="checkbox form-group">

                <input type="checkbox" id="offset"  onChange={this.emailCheck.bind(this)}  defaultChecked={this.state.infoDisplayed.email}  />

                <label htmlFor="email">Email</label><br/>

                </li>

                <li className="checkbox form-group">

                <input type="checkbox" id="offset" onChange={this.joinedCheck.bind(this)} defaultChecked={this.state.infoDisplayed.joined}  />

                <label htmlFor="joined">Joined</label>

                </li>

                </ul>

                </div>

                */}



                <div className="dropdown" style={dropStyle} id="valueItemDrop">

                  <button className="selectbox" style={dropButStyle} id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    Colonnes

                  </button>

                  <ul className="dropdown-menu" aria-labelledby="dLabel">

                    <li className="checkbox form-group">

                      <input type="checkbox" onChange={this.firstNameCheck.bind(this)}  defaultChecked={this.state.infoDisplayed.firstName} id="valuePot" value="Value Pot" name="Value Pot" />

                      <label htmlFor="valuePot">First Name</label>

                    </li>

                    <li className="checkbox form-group">

                      <input type="checkbox" id="payback"  onChange={this.LastNameCheck.bind(this)}   defaultChecked={this.state.infoDisplayed.lastName} value="Payback" name="Payback" />

                      <label htmlFor="payback">Last Name</label>

                    </li>

                    <li className="checkbox form-group">

                      <input type="checkbox" id="writeOff" value="Write-off"  onChange={this.usernameCheck.bind(this)}   defaultChecked={this.state.infoDisplayed.username} name="Write-off" />

                      <label htmlFor="writeOff">Username</label>

                    </li>

                    <li className="checkbox form-group li-line">

                      <input type="checkbox" id="offset" onChange={this.emailCheck.bind(this)}  defaultChecked={this.state.infoDisplayed.email} value="Offset" name="Offset" />

                      <label htmlFor="offset">Email</label>

                    </li>

                    <li className="checkbox form-group">

                      <input type="checkbox" id="genValuePot" onChange={this.joinedCheck.bind(this)} defaultChecked={this.state.infoDisplayed.joined} value="Gen Value Pot" name="Gen Value Pot" />

                      <label htmlFor="genValuePot">Creation Date</label>

                    </li>

                  </ul>

                </div>

                <div className="pull-right">



                  <div id="DataTables_Table_5_filter" style={pullLeftStyle} className="dataTables_filter">

                    <div className="input-group">

                      <div className="input-group-addon">

                        <i className="fa fa-search"></i>

                      </div>

                      <input type="search" onKeyUp={this.search.bind(this)} ref="search" className="form-control input-sm" placeholder="Search" />

                      <div className="input-group-btn">

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="box-body">













              <table className="table dataTable no-footer" >

                <thead>

                  <tr>

                    {tableHead}

                    <td><b>Edit</b></td>

                    <td><b>Delete</b></td>

                  </tr>

                </thead>

                <tbody>

                  {userLine}

                </tbody>

              </table>



            </div>



            <div className="box-footer">


              <center>

                <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_5_paginate">

                  <ul className="pagination" style={marginStyle}>

                    <li className={this.state.previousClass} onClick={this.previous.bind(this)} aria-controls="DataTables_Table_5" tabIndex="0" id="DataTables_Table_5_previous">

                      <a href="#">Previous</a>

                    </li>


                    {rows}


                    <li className={this.state.nextClass} onClick={this.next.bind(this)} aria-controls="DataTables_Table_5" tabIndex="0" id="DataTables_Table_5_next">

                      <a href="#">Next</a>

                    </li>

                  </ul>

                </div>

              </center>

            </div>



          </div>


        </div>



      </section>

    </div>


  );

}

}


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
