let slides = [
  {
    id: 1,
    nom: "HOME",
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides).catch((err) => {
    console.log("error : seeds usr");
  });
};
