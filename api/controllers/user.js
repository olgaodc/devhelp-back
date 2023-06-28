const uniqid = require('uniqid');
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.SIGN_UP = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    if (!email.includes('@')) {
      return res.status(400).json({ response: 'Email should contain @' });
    }

    const password = req.body.password;
    const passwordSymbols = /^(?=.*\d).{6,}$/;
    if (!passwordSymbols.test(password)) {
      return res.status(400).json({ response: 'The password must have a minimum of 6 characters and include at least one number' })
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new UserModel({
          name: name,
          email: email,
          password: hash,
          asked_questions_ids: [],
          id: uniqid(),
        });
        await user.save();
      });
    });
    return res.status(200).json({ response: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ response: 'Error, please try later' });
  }
}


module.exports.LOG_IN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ response: 'Invalid email or password' });
    };

    bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
      if (isPasswordMatch) {
        const token = jwt.sign({
          email: user.email,
          userId: user.id,
        },
          process.env.JWT_SECRET,
          { expiresIn: '2h' },
          { algorithm: 'RS256' }
        );

        const refreshToken = jwt.sign({
          email: user.email,
          userId: user.id,
        },
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
          { algorithm: "RS256" }
        );

        return res.status(200).json({ response: "You logged in", jwt: token, refreshJwt: refreshToken });
      } else {
        return res.status(404).json({ response: 'Invalid email or password' });
      }
    });
  } catch (err) {
    console.log(err); 
    return res.status(500).json({response: 'Error, please try later'})
  }
}

