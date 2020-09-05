const bcrypt = require("bcrypt");

module.exports = db => {

  const authenticateUser = (email, password) => {
    return db
      .query(
        `
      SELECT * FROM users
      WHERE email = $1;
      `,
        [email]
      )
      .then(res => {
        const user = res.rows[0];
        if (user) {
          return (bcrypt.compareSync(password, user.password));
        }
      });
  };
  return {
    authenticateUser
  };
};