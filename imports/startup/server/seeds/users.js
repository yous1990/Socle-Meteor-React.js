/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const adminUser = {
  username: 'admin',
  email: 'admin@mail.com',
  profile : {
    firstName : 'adminName',
    lastName : 'AdminLast',
    birthday : new Date()
  },
  password: 'abc123',
  roles : ['admin']
};

const gaddourUser = {
  username : 'Gaddour',
  email : 'gaddour@gmail.com',
  profile : {
    firstName : 'Abdelkader',
    lastName : 'Becha',
    birthday : new Date()
  },
  password : 'aaaaaa',
  roles : ['admin']
}


if (!Meteor.users.findOne()) {
  Accounts.createUser(gaddourUser);
  Accounts.createUser(adminUser);
}
