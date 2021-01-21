async function APIFetch(endpoint, reqObject = {}, callback = () => {}) {
  let resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    ...reqObject,
  });
  let res = await resp.json();
  callback(res);
}

function formArrayToJson(form_data) {
  var object = {};

  form_data.forEach(({ name, value }) => {
    if (name.indexOf("type") != -1) name = "type";
    if (name.indexOf("sub") != -1) name = "sub";
    object[name] = value;
  });
  return object;
}

function NotifyResult({
  success = false,
  message = "Error Found Please Try Again",
  title = "Operation Result",
}) {
  Swal.fire({
    title: title,
    text: message,
    icon: success ? "success" : "error",
  });
}

function NotifyError(message = "Error Found Please Try Again") {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
}
setActiveSidebarLink();
function setActiveSidebarLink() {
  var current = location.pathname;
  $("#sidenav-collapse-main a.nav-link").each(function () {
    var $this = $(this);
    // if the current path is like this link, make it active
    if ($this.attr("href") === current) {
      $this.addClass("active");
    }
  });
}

async function showConfirmDialog(message, callback) {
  Swal.fire({
    title: "Êtes-vous sûr?",
    text: message || "êtes-vous sûr de vouloir supprimer ce blog.",
    icon: "warning",
    showCancelButton: true,
    // buttons: true,
    // dangerMode: true,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      callback();
    }
  });
}
