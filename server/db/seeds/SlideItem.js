let slides = [
  {
    title: "To be always on demand",
    sub: "We are proud",
    picture: "/uploads/image-1610569892700.jpg",
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    parent: 1,
  },
  {
    title: "To ship your product trusted",
    sub: "We are active",
    picture: "/uploads/image-1610569979749.jpg",
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    parent: 1,
  },
  {
    title: "To ship your product trusted",
    sub: "We are proud",
    picture: "/uploads/image-1610570148007.jpg",
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.",
    parent: 1,
  },
];
module.exports = async function (SlideShow) {
  SlideShow.bulkCreate(slides).catch((err) => {
    console.log("error : seeds usr");
  });
};
