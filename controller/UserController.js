const User = require('../models/user');

// Get Users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    console.log(users);
    if (users.length === 0) throw new Error('Users not found');

    return res.json({ status: true, data: users });
  } catch (error) {
    return res.json({ status: false, message: 'Users not found' });
  }
}

// Get User By Id
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found');

    return res.json({ status: true, data: user });
  } catch (error) {
    return res.json({ status: false, message: 'User not found' });
  }
}

async function getUserByType(req, res) {
  try {
    const userTypeData = await User.find({ type: req.params.type });
    if (userTypeData.length === 0)
      throw new Error(`No ${req.params.type} found`);

    return res.json({ status: true, data: userTypeData });
  } catch (error) {
    return res.json({
      status: false,
      message: `No ${req.params.type} found`,
    });
  }
}

async function login(req, res) {
  try {
    var { username, password } = req.body; //Get the parsed information
    if (!username || !password) {
      throw new Error('Invalid credentials');
    }

    const user = await User.findOne({
      username,
      password,
    });
    if (!user) throw new Error('Invalid credentials');

    return res.json({
      status: true,
      message: 'Successfully logged in',
      data: user,
      userType: user.type,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: `Invalid credentials`,
    });
  }
}
async function signup(req, res) {
  try {
    const { username, password, fullName, type } = req.body; //Get the parsed information
    if (!username || !password || !type) {
      throw new Error('Please fill the required fields');
    }

    if (!['doctor', 'patient', 'pharmacy'].includes(type))
      throw new Error(`${type} user cant signup`);

    const userExists = await User.exists({ username });

    if (userExists) throw new Error('Please choose another user name');

    const user = await User.create({
      username,
      password,
      fullName,
      type,
    });

    return res.json({
      status: true,
      message: 'Successfully signed up',
      data: user,
    });
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
}
module.exports = { getUserById, getUserByType, login, signup, getAllUsers };
