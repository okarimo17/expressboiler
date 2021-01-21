const { Model } = require("sequelize");

let defaultsInformation = [
  {
    content: {
      phone: "+213 661 52 77 00",
      mobile: "+213 661 27 77 16",
      email: "sarltransmeddg@gmail.com",
      worktime: "9:00AM à 17:00PM",
      address:
        "7 Rue Mouloud Zadi Sacré Coeur Didouche Mourad Alger Centre - Alger.",
      footer:
        "La société SARL TRANSMED existe depuis 1991, elle s’est spécialiser dans toutes les Operations import-export concernant surtout l’Europe et bien avant d’autre l’Asie Elle a acquis une longue expérience sur le terrain durant plus de deux décennies.",
      facebook: "fb.com/pagename",
      twitter: "twitter.com/pagename",
      youtube: "youtube.com/pagename",
      instagram: "instagram.com/pagename",
      projet: 578,
      client: 347,
      transition: 128,
      logistic: 67,
      sitename: "Sarltransmed",
      address:
        "7 Rue Mouloud Zadi Sacr&eacute; Coeur Didouche Mourad Alger Centre - Alger.",
    },
  },
];

module.exports = function (Information) {
  Information.bulkCreate(defaultsInformation);
};
