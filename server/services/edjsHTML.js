"use strict";
var t = {
  delimiter: function () {
    return "<br/>";
  },
  header: function (t) {
    var e = t.data;
    return "<h" + e.level + "> " + e.text + " </h" + e.level + ">";
  },
  paragraph: function (t) {
    return "<p> " + t.data.text + " </p>";
  },
  list: function (t) {
    var e = t.data,
      r = "unordered" === e.style ? "ul" : "ol",
      n = "";
    return (
      e.items &&
        (n = e.items
          .map(function (t) {
            return "<li> " + t + " </li>";
          })
          .reduce(function (t, e) {
            return t + e;
          }, "")),
      "<" + r + " class='bullet-list ml20'> " + n + " </" + r + ">"
    );
  },
  image: function (t) {
    var e = t.data,
      r = e.caption ? e.caption : "Elwourod Center";
    return '<img src="' + (e.file ? e.file.url : "") + '" alt="' + r + '" />';
  },
  quote: function (t) {
    var e = t.data;
    return "<blockquote> " + e.text + " </blockquote> - " + e.caption;
  },
  embed: function (t) {
    var e = t.data;
    return `<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen="" src="${e.embed}" class="embed-tool__content"></iframe>`;
  },
  /*
data: {
      service: 'youtube',
      source: 'https://www.youtube.com/watch?v=8DSeZji2x-Y',
      embed: 'https://www.youtube.com/embed/8DSeZji2x-Y',
      width: '580',
      height: '320',
      caption: ''
    }
    */
};

function e(t) {
  return new Error(
    '[31m The Parser function of type "' +
      t +
      '" is not defined. \n\n  Define your custom parser functions as: [34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks [0m'
  );
}
module.exports = function (r) {
  return (
    void 0 === r && (r = {}),
    Object.assign(t, r),
    {
      parse: function (r) {
        return r.blocks.map(function (r) {
          return t[r.type] ? t[r.type](r) : e(r.type);
        });
      },
      parseBlock: function (r) {
        return t[r.type] ? t[r.type](r) : e(r.type);
      },
    }
  );
};
