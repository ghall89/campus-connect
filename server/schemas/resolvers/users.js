const { UserInputError, AuthenticationError, } = require('apollo-server-express');
const { User, Message } = require('../../models');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

module.exports = {
  // Queries
  Query: {
    // get all users
    getUsers: async (_parent, _args, context) => {
      // console.log(context.user);
      try {
        // throw error if the user is not logged in
        if (!context.user) throw new AuthenticationError('Not logged in');
        const clientEmail = context.user.email;
        let allUsers = await User.find({ email: { $ne: clientEmail } });
        const msgs = await Message.find({ $or: [{ from: clientEmail }, { to: clientEmail }] })
          .sort({ createdAt: -1 });
        allUsers = allUsers.map((otherUser) => {
          const latestMessage = msgs.find(
            (m) => m.from === otherUser.username || m.to === otherUser.username)
          otherUser.latestMessage = latestMessage
          return otherUser
        })
        return allUsers;
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    // user login
    login: async (_parent, { email, password }) => {
      let errors = {}
      try {
        // Validate user input
        if (email.trim() === '')
          errors.email = 'email must not be empty'
        if (password === '') errors.password = 'password must not be empty'

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors })
        }
        // check if email is in the database
        const user = await User.findOne({ email });
        if (!user) throw new AuthenticationError('Incorrect Credentials');
        // check if password is matching/correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) throw new AuthenticationError('Incorrect Credentials');
        const token = jwt.sign({ email }, "myawesomeproject", {
          expiresIn: 60 * 60,
        })
        return {
          ...user.toJSON(),
          token,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },

  // Mutations
  Mutation: {
    // Add user or signup
    addUser: async (_parent, args) => {
      let { username, email, password } = args
      let errors = {}
      try {
        // Validate user input
        if (email.trim() === '') errors.email = 'email must not be empty'
        if (username.trim() === '')
          errors.username = 'username must not be empty'
        if (password.trim() === '')
          errors.password = 'password must not be empty'
        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors })
        }
        const user = await User.create(args);
        const token = jwt.sign({ email }, "myawesomeproject", {
          expiresIn: 60 * 60,
        })
        return {
          ...user.toJSON(),
          token,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },

};


// To do:
// 1. Catch all database errors to display on the front-end
// 2. change getmsgs to include msg sent by as well as sent to you
// 3. reactToMessage is incomplete, need to complete it
// 4. move JWT_SECRET to process.env