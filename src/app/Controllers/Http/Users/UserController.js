const User = require('../../../Models/Users/User');
const DatasetUser = require('../../../Models/Users/DatasetUser');
const UserSchema = require('../../../Schemas/Users/UserSchema');

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      include: [{ model: DatasetUser, as: 'dataset' }],
      attributes: ['id', 'name', 'email'],
    });

    return res.status(200).json(user);
  }

  async store(req, res) {
    const user = await User.create(req.body);
    const mongo = await UserSchema.create({
      email: user.email,
      user_id: user.id,
      user: user.dataValues,
    });

    return res.status(200).json({ user, mongo });
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new UserController();
