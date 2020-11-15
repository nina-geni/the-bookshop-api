/**
 * The Query Resolvers
 * Data ophalen
 */
const { Boek, Categorie, User } = require('../mongo/models');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    // e.g. dummies: () => dummies
    categories: () => Categorie.find(),
    categorie: (parent, {id}) => Categorie.findById(id),
    boeken: () => Boek.find().populate('categories').exec(),
    boek: (parent, {id}) => Boek.findById(id).populate('categories').exec(),
    login: async (parent, { user }, context) => {
      const { email, password } = user;

      const userExists = await User.exists({ email });
      if(!userExists) throw new Error('User does not exist.');

      const foundUser = await User.findOne({ email: email});
    

      const isEqual = bcrypt.compareSync(password, foundUser.password);
      if(!isEqual) throw new Error ('Password is incorrect');
      
      const token = jwt.sign(
        { userId: foundUser._id, email:foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      return {
        userId: foundUser.id,
        token
      }
    },

    users: (parent, params, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.find();
    },

    user: (parent, { id }, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.findOne({ _id: id});
    }
  },
  Boek: {
    categories: ({ categories }, params, context) => {
      return categories.map(({ _id, naam}) => ({ id: _id, naam}));
    }
  }
}