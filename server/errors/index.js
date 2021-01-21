class BadRequest extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
  }
}

class UnAuthorized extends Error {
  constructor(message = "Unauthorized Request") {
    super(message);
    this.status = 401;
  }
}

class PageNotFound extends Error {
  constructor(message = "Page Not Found") {
    super(message);
    this.status = 404;
  }
}

class ImageUploadError extends Error {
  constructor(message = "Only Images Are Allowed") {
    super(message);
    this.status = 401;
  }
}
module.exports = {
  BadRequest,
  UnAuthorized,
  ImageUploadError,
  PageNotFound,
};
