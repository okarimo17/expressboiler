let slides = [
  {
    id: 1,
    content:
      "Merci Pour Votre travail Professionnel Transmed, Vous Êtes Sérieux respectueux et digne de confiance avec de grandes compétances.",
    picture: "/uploads/image-1610725555841.jpg",
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides).catch((err) => {
    console.log("error : seeds usr");
  });
};
