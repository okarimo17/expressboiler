function initInfoPage() {
  $("form.content-form").submit(saveBlog);

  async function saveBlog(ev) {
    ev.preventDefault();

    let data = $("form.content-form").serializeArray();
    data = formArrayToJson(data);

    APIFetch(
      "/v1/information",
      {
        method: "post",
        body: JSON.stringify(data),
      },
      (res) => {
        return NotifyResult(res);
      }
    );
  }
}
