let slides = [
  {
    id: 1,
    nom: "Import",
  },
  {
    id: 2,
    nom: "Export",
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides).catch((err) => {
    console.log("error : seeds usr");
  });
};
