const OP = require("sequelize").Op;
const { BadRequest, UnAuthorized } = require("../errors");
const { UserModel } = require("../db");
const {
  UserSchema: { UserRegisterSchema, UserLoginSchema, UserUpdateSchema },
} = require("../validaters");
const CryptService = require("./CryptService");

function UserService() {
  async function createUser(userData) {
    await UserRegisterSchema.validateAsync(userData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let exist = await UserExist(userData);
    if (exist) {
      if (exist.email === email)
        throw new BadRequest("Adresse e-mail non valide ou utilisée.");
      throw new BadRequest("Nom d'utilisateur déjà utilisé.");
    }
    userData.password = await CryptService.encPass(userData.password);
    let user = await UserModel.create(userData);
    return user;
  }

  async function updateUser({ oldpassword, ...userData }) {
    await UserUpdateSchema.validateAsync(userData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let user = await findUserById(userData);
    if (!user) {
      throw new BadRequest("Le compte d'utilisateur n'existe pas.");
    }

    let exist = await UserExist(userData);

    if (exist && exist.id != userData.id) {
      if (exist.email === email)
        throw new BadRequest("Adresse e-mail non valide ou utilisée.");
      throw new BadRequest("Nom d'utilisateur déjà utilisé.");
    }
    if (!(await CryptService.cmpPass(oldpassword, user.password))) {
      throw new BadRequest("Mot de passe actuelle faux.");
    }
    userData.password = await CryptService.encPass(userData.password);
    user = await UserModel.update(userData, { where: { id: userData.id } });
    return user;
  }

  async function loginUser(userData) {
    await UserLoginSchema.validateAsync(userData).catch((err) => {
      throw new BadRequest(err.message);
    });
    let data = { email: userData.email, username: userData.email };
    let user = await UserExist(data);
    if (
      !user ||
      !(await CryptService.cmpPass(userData.password, user.password))
    )
      throw new UnAuthorized(
        `L'utilisateur n'existe pas ou des données erronées.`
      );

    return user;
  }

  async function UserExist({ email, username }) {
    let exist = await UserModel.findOne({
      where: {
        [OP.or]: [
          {
            email: {
              [OP.eq]: email,
            },
          },
          {
            username: {
              [OP.eq]: username,
            },
          },
        ],
      },
    });
    return exist;
  }

  async function findUserByEmail({ email }) {
    let exist = await UserModel.findOne({ where: { email } });
    return exist;
  }

  async function findUserByUsername({ username }) {
    let exist = await UserModel.findOne({ where: { username } });
    return exist;
  }

  async function findUserById({ id }) {
    let exist = await UserModel.findOne({ where: { id } });
    return exist;
  }

  return {
    createUser,
    loginUser,
    findUserById,
    updateUser,
  };
}

module.exports = UserService();
