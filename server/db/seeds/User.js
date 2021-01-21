const CryptService = require("../../services/CryptService");

let defauleAdmin = [
  {
    email: "oucifkarimo17@gmail.com",
    username: "066666",
    password: "066666",
  },
];
module.exports = async function (User) {
  defauleAdmin[0].password = await CryptService.encPass(
    defauleAdmin[0].password
  );
  User.bulkCreate(defauleAdmin).catch((err) => {
    console.log("error : seeds usr");
  });
};
