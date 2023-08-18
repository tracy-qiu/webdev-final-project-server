import * as usersDao from "./users-dao.js";
let loggedInUser;

const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        loggedInUser = user;
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(403);
    }
  };

  const profile = async (req, res) => {
    const currentUser = loggedInUser;
    console.log(currentUser);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {};
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);
};
export default AuthController;
