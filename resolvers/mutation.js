/**
 * The Mutation Resolvers
 */
const bcrypt = require('bcrypt');
const { Boek, Categorie, User } = require('../mongo/models');
const pubsub = require('./pubsub');

module.exports = {
  Mutation: {
    // e.g. addDummy: (parent, { dummy }, { userAllowed }) => {}
    addCategorie: async (parent, { categorie }, context) => {
      try {
        return await Categorie.create({
          ...categorie
        });
      } catch(e) {
        throw new Error (e.message);
      }
    },
    updateCategorie: async (parent, { categorie, categorieId  }, context) => {
      try {
        const { naam } = categorie;

        const categorieExists = await Categorie.exists({ _id: categorieId });
        if(!categorieExists) throw new Error('Categorie bestaat al.')

        const foundCategorie = await Categorie.findOne({_id: categorieId});
        foundCategorie.naam = naam;
        return await foundCategorie.save();

      } catch(e) {
        throw new Error (e.message);
      }
    },
    deleteCategorie: async (parent, { categorieId  }, context) => {
      try {

        const categorieExists = await Categorie.exists({ _id: categorieId });
        if(!categorieExists) throw new Error('Categorie bestaat al.')

        const foundCategorie = await Categorie.findOne({_id: categorieId});
        Categorie.deleteOne({ _id:categorieId});
        return foundCategorie;

      } catch(e) {
        throw new Error (e.message);
      }
    },
    // e.g. addDummy: (parent, { dummy }, { userAllowed }) => {}
    addBoek: async (parent, { boek }, context) => {
      try {
        let categories =  [];

        if (boek.categories && boek.categories.length > 0) {
          const categorieIds = boek.categories.map(({ id }) => id);
          categories = await Categorie.find({ _id: { $in: categorieIds}});
        }

        const nieuwBoek = await Boek.create({
          ...boek,
          categories,
          toevoegingsDatum: new Date,
        });

        pubsub.publish('BOEK_ADDED', { boekAdded: nieuwBoek});

        return await Boek.findOne({ _id: nieuwBoek._id}).populate('categories').exec();
      } catch(e) {
        throw new Error (e.message);
      }
    },
    updateBoek: async (parent, { boek, boekId  }, context) => {
      try {
        let categories =  [];

        if (boek.categories && boek.categories.length > 0) {
          const categorieIds = boek.categories.map(({ id }) => id);
          categories = await Categorie.find({ _id: { $in: authorIds}});
        }

        boek.categories = categories;

        const boekExists = await Boek.exists({ _id: boekId });
        if(!boekExists) throw new Error('Boek bestaat al.')

        await Boek.findOneAndUpdate(
          { _id: boekId },
          boek,
          { new: true}
        )
        return await Boek.findOne({ _id: boekId}).populate('categories').exec();

      } catch(e) {
        throw new Error (e.message);
      }
    },
    deleteBoek: async (parent, { boekId  }, context) => {
      try {

        const boekExists = await Boek.exists({ _id: boekId });
        if(!boekExists) throw new Error('Boek bestaat al.')

        const foundBoek = await Boek.findOne({_id: boekId});
        await Boek.deleteOne({ _id: boekId});
        return foundBoek;

      } catch(e) {
        throw new Error (e.message);
      }
    },
    // e.g. addDummy: (parent, { dummy }, { userAllowed }) => {}
    register: async (parent, { user }) => {
      const { email, password } = user;

      const userExists = await User.exists({ email });
      if(userExists) throw new Error('Gebruiker bestaat al.')

      const hashedPassword = bcrypt.hashSync(password, 12);

      const newUser = await User.create({
        email,
        password: hashedPassword
      });

      newUser.password = null;
      return newUser;
    },
  }
}