const Hash = use('Hash');
const { validate } = use('Validator');
const Encryption = use('Encryption');
const User = use('App/Models/User');
const Token = use('App/Models/Token');

class AuthController {
  async signIn({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);
    console.log({ email, password })
    try {
      return await auth.withRefreshToken().attempt(email, password);
    } catch (err) {
      response.status(401).send({ error: 'Invalid email or password' });
    }
  }

  async register({ request, response }) {
    const { email, username, password } = request.only([
      'email',
      'username',
      'password'
    ]);
    try {
      const user = await User.create({ email, username, password });
      return response.send({ message: 'User has been created' });
    } catch (err) {
      response.status(401).send({ error: 'Please try again' });
    }
  }

  async refreshToken({ request, response, auth }) {
    const { refresh_token } = request.only(['refresh_token']);
    try {
      return await auth
        .newRefreshToken()
        .generateForRefreshToken(refresh_token);
    } catch (err) {
      response.status(401).send({ error: 'Invalid refresh token' });
    }
  }

  async logout({ request, response, auth }) {

    const { refresh_token } = request.only(['refresh_token']);


    const decrypted = Encryption.decrypt(refresh_token);

    const refreshToken = await Token.findBy('token', decrypted);
    if (refreshToken) {
      refreshToken.delete();
      response.status(200).send({ status: 'ok' });
    } else {
      response.status(401).send({ error: 'Invalid refresh token' });
    }
  }
}

module.exports = AuthController;
