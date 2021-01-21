let form = document.querySelector(".loginForm__content form");

form.addEventListener("submit", handleLogin);

async function handleLogin(ev) {
  ev.preventDefault();
  var data = Serialize(this);

  var resp = await fetch("/v1/auth/login", {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let resJs = await resp.json();
  if (resJs.success) {
    form.classList.remove("error");
    document.querySelector(".alert.alert-success").innerText = resJs.message;
    form.classList.add("success");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } else {
    form.classList.remove("success");
    document.querySelector(".alert.alert-danger").innerText = resJs.message;
    form.classList.add("error");
  }
  //   window.location = "/dashboard";
}

function Serialize(formElement) {
  var data = Array.from(new FormData(formElement));
  return formArrayToJson(data);
}

function formArrayToJson(form_data) {
  var object = {};

  form_data.forEach(([name, value]) => {
    object[name] = value;
  });
  return object;
}
