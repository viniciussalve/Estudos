import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const { id, name, email, provider } = req.body;

    const user = await User.create({
      id,
      name,
      email,
      provider,
    });

    return res.json(user);
  }
}

export default new UserController();
