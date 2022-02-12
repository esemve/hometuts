const { User } = require('../models')
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = {

  async index (req, res) {
    try {

      const users = await User.findAll();

      const outputList = users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        }
      });

      res.send({
        users: outputList
      });
    } catch (err) {
      res.status(500).send({
        error: 'Error!'
      })
    }
  },

  async delete (req, res) {
    try {

      const userId = req.params.id

      const hasAnotherAdmin = await User.count({
        where: {
          isAdmin: true,
          id: {
            [op.not]: userId
          }
        }
      })

      if (hasAnotherAdmin === 0) {
        res.status(400).send({
          error: 'You cant remove all of admin!'
        })
        return
      }

      User.destroy({
        where: {
          id: userId
        }
      })

      res.status(201).send();
    } catch (err) {
      res.status(500).send({
        error: 'Error!'
      })
    }
  },


  async addAdminRole (req, res) {
    try {

      const userId = req.params.id

      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      user.isAdmin = true
      user.save()

      res.status(201).send();
    } catch (err) {
      res.status(500).send({
        error: 'Error!'
      })
    }
  },


  async removeAdminRole (req, res) {
    try {

      const userId = req.params.id

      const hasAnotherAdmin = await User.count({
        where: {
          isAdmin: true,
          id: {
            [op.not]: userId
          }
        }
      })

      if (hasAnotherAdmin === 0) {
        res.status(400).send({
          error: 'You cant remove all of admin!'
        })
        return
      }

      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      user.isAdmin = false
      user.save()

      res.status(201).send();
    } catch (err) {
      res.status(500).send({
        error: 'Error!'
      })
    }
  },

  async create (req, res) {
    try {

      const data = req.body

      try {
        if (data.username === '' || data.password === '') {
          throw new Error();
        }
      } catch (err) {
        res.status(400).send({
          error: 'Bad request!'
        })
      }

      const userWithUsername = await User.findOne({
        where: {
          username: data.username
        }
      })

      if (userWithUsername) {
        res.status(409).send({
          error: 'This username is taken!'
        })
      }

      await User.create({
        username: data.username,
        password: data.password,
        isAdmin: data.isAdmin === 1
      })

      res.status(201).send();
    } catch (err) {
      res.status(500).send({
        error: 'Error!'
      })
    }
  },
};