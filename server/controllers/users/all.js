const bcrypt = require('bcrypt');
const User = require('../../models/users');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'User create !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User ID not found !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.sendMail = (req, res, next) => {
  const apiKey = '1a482e42cbd20dd8a5d91e1ac671e647';
  const apiSecret = '9b022a2b5bf920f6562d1b167ccaa6fc';

  const data = {
    "Messages":[
      {
        "From": {
          "Email": "kwuimobryan@gmail.com",
          "Name": "bryan"
        },
        "To": [
          {
            "Email": "kwuimobryan@gmail.com",
            "Name": "bryan"
          }
        ],
        "Subject": "My first Mailjet email",
        "TextPart": "Greetings from Mailjet.",
        "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
        "CustomID": "AppGettingStartedTest"
      }
    ]
  };

  axios.post('https://api.mailjet.com/v3.1/send', data, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: apiKey,
      password: apiSecret
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    res.status(200)
  })
  .catch(error => {
    console.error('Error:', error.response.data);
    res.status(500)
  });
};


