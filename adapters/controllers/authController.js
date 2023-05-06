import login from "../../application/use_cases/auth/login.js";

export default function authController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const doLogin = (req, res) => {
    const { email, password } = req.body;
    const role = req?.role;

    login(email, password, dbRepository, authService, role)
      .then((token) => {
        res.status(200).json({ token });
      })
      .catch((err) => {
        res.status(401).json({ message: err });
      });
  };

  return {
    doLogin
  };
}
