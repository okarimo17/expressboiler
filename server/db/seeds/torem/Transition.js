let slides = [
  {
    title: "Export",
    excrept: "Panneau Polystere",
    published: true,
    date: "01/10/2021",
  },
  {
    title: "Import",
    excrept: "L'arrivage du port de Malaisie - Poudre de Calicium.",
    published: true,
    date: "01/15/2021",
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides).catch((err) => {
    console.log("error : seeds usr");
  });
};
