let ServicesNames = [
  "CryptService",
  "UserService",
  "UploadService",
  "SessionService",
  "AuthService",
  "InformationService",
  "BlogService",
  "edjsHTML",
  "DateService",
  "SlideShowService",
  "MailService",
  // "GalleryService",
  // "TestimonialService",
  // "TransitionService",
  // "PageService",
];

ServicesNames.map((name) => (module.exports[name] = require(`./${name}`)));
