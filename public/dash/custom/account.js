function initAccountPage() {
  $("form#info_page").submit(saveInformations);

  async function saveInformations(ev) {
    ev.preventDefault();
    let data = $("form#info_page").serializeArray();

    data = formArrayToJson(data);

    $.ajax({
      type: "PUT",
      url: "/v1/user",
      data: data,
      dataType: "json",
      success: function (response) {
        NotifyResult(response);
      },
      error: function (resp) {
        NotifyResult(resp.responseJSON);
      },
    });
  }
}
