import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Class from '../models/Class';
import User from '../models/User';

export const register = (req, res) => {
  try {
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        return res.status(400).json({ err: 'Username already exists !!' });
      } else {
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (_err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json({ success: true, user }))
              .catch((err) => res.status(400).json({ success: false, err }));
          });
        });
      }
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const login = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
      .populate({
        path: 'classes',
        model: 'Class',
        populate: [
          {
            path: 'teacher',
            model: 'User',
          },
        ],
      })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ err: 'User not found!!!' });
        }
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const payload = {
              id: user.id,
              username: user.username,
              role: user.role,
              email: user.email,
              name: user.name,
              classes: user.classes,
            };

            jwt.sign(payload, process.env.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              if (err) res.json(err);
              res.json({ success: true, data: payload, token: `Bearer ${token}` });
            });
          } else {
            return res.status(400).json({ err: 'Password incorrect' });
          }
        });
      });
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = async (req, res) => {
  const { role, page } = req.query;
  const query = role ? { role } : {};
  const total = await User.countDocuments(query);

  User.find(query)
    .skip((page ? page - 1 : 0) * 10)
    .limit(10)
    .then((users) => {
      res.status(200).json({
        data: users.map((e) => {
          e.password = null;
          return e;
        }),
        total,
      });
    })
    .catch((err) => res.status(400).json({ err }));
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    {
      ...req.body,
      updated_at: Date.now(),
    },
    { new: true, useFindAndModify: false },
  )
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.id })
    .then((ques) => {
      res.status(200).json({ id: req.params.id });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
