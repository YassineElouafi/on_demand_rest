const Hash = use('Hash');
const { validate } = use('Validator');
const Encryption = use('Encryption');
const User = use('App/Models/User');
const Token = use('App/Models/Token');

class AuthController {
  async signIn({ request, response, auth }) {
    const rules = {
      username: 'required|email',
      password: 'required'
    };

    const { username, password } = request.only(['username', 'password']);

    console.log({ username, password })

    const validation = await validate({ username, password }, rules);

    // if (!validation.fails()) {
      try {
        return await auth.withRefreshToken().attempt(username, password);
      } catch (err) {
        response.status(401).send({ error: 'Invalid email or password' });
      }
    // } else {
    //   response.status(401).send(validation.messages());
    // }
  }

  async register({ request, response }) {
    const rules = {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users,username',
      password: 'required'
    };
    const { email, username, password } = request.only([
      'email',
      'username',
      'password'
    ]);

    const validation = await validate({ email, username, password }, rules);

    // console.log(validation.fails())
    
    // if (!validation.fails()) {
      try {
        const user = await User.create({ email, username, password });
        return response.send({ message: 'User has been created' });
      } catch (err) {
        response.status(401).send({ error: 'Please try again' });
      }
    // } else {
    //   response.status(401).send(validation.messages());
    // }
  }

  async refreshToken({ request, response, auth }) {
    const rules = {
      refresh_token: 'required'
    };

    const { refresh_token } = request.only(['refresh_token']);

    const validation = await validate({ refresh_token }, rules);

    // if (!validation.fails()) {
      try {
        return await auth
          .newRefreshToken()
          .generateForRefreshToken(refresh_token);
      } catch (err) {
        response.status(401).send({ error: 'Invalid refresh token' });
      }
    // } else {
    //   response.status(401).send(validation.messages());
    // }
  }

  async logout({ request, response, auth }) {
    const rules = {
      refresh_token: 'required'
    };

    const { refresh_token } = request.only(['refresh_token']);

    const validation = await validate({ refresh_token }, rules);

    const decrypted = Encryption.decrypt(refresh_token);

    if (!validation.fails()) {
      try {
        const refreshToken = await Token.findBy('token', decrypted);
        if (refreshToken) {
          refreshToken.delete();
          response.status(200).send({ status: 'ok' });
        } else {
          response.status(401).send({ error: 'Invalid refresh token' });
        }
      } catch (err) {
        response.status(401).send({ error: 'something went wrong' });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }
}

module.exports = AuthController;
