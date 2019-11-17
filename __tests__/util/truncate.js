const User = require('../../src/app/Models/Users/User');
const DatasetUser = require('../../src/app/Models/Users/DatasetUser');

const cleanDatabase = async () => {
  User.destroy({ truncate: true, force: true });
  DatasetUser.destroy({ truncate: true, force: true });
};

module.exports = cleanDatabase;
