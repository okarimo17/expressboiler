function initSlideBlog(slideItems = []) {
  let slidesHolder = $(".slides_holder");
  let slides_form = document.getElementById("slide_item_form");
  let edit_slide_modal = "#new_slide_modal";
  let oldimage;
  console.log(slideItems);
  $("button#new_slide").click(openNewModal);

  slides_form.onsubmit = saveSlides;
  fillSlidesHolder(slideItems);

  function openNewModal() {
    // $(`${edit_slide_modal} input.id`).attr("value", "-1");
    // $(edit_slide_modal).modal();
    oldimage = "";
    fillForm({});
  }

  function fillSlidesHolder(slides) {
    let content;
    if (slides.length)
      content = slides.map((item, index) => slideItem(item, index)).join("");
    else
      content = `<p class="lead"> aucun Slide existe, ajoutez-en un nouveau .</p>`;
    $(slidesHolder).html(content);

    $(`.slides_holder .card-body .btn.btn-primary`).click(function (ev) {
      let id = $(this).attr("data-id");
      let item = slideItems[id];
      fillForm(item);
    });
    $(`.slides_holder .card-body .btn.btn-danger`).click(function (ev) {
      let ind = $(this).attr("data-id");
      let { id } = slideItems[ind];
      removeSlide(id);
    });
  }

  function fillForm({
    id = "-1",
    desc = "",
    picture = "",
    sub = "",
    title = "",
  }) {
    $(`${edit_slide_modal} input.id`).attr("value", `${id}`);
    $(`${edit_slide_modal} input.desc`).attr("value", `${desc}`);
    $(`${edit_slide_modal} input.sub`).attr("value", `${sub}`);
    $(`${edit_slide_modal} input.title`).attr("value", `${title}`);
    $(`${edit_slide_modal} input.picture`).attr("value", `${picture}`);
    $(`${edit_slide_modal} input.feature_up`).attr("value", `${picture}`);
    $(`${edit_slide_modal} img.image_preview`).attr("src", `${picture}`);
    oldimage = picture;
    $(edit_slide_modal).modal();
  }

  async function removeSlide(slideid) {
    APIFetch(
      `/v1/slides/${slideid}`,
      {
        method: "DELETE",
      },
      (res) => {
        slideItems = res.body;
        fillSlidesHolder(res.body);
        return NotifyResult(res);
      }
    );
  }

  async function saveSlides(ev) {
    ev.preventDefault();
    if ($("input.image").val() == "") {
      return NotifyError("vous devez choisir une image.", false);
    }
    let data = $(slides_form).serializeArray();

    data = formArrayToJson(data);

    APIFetch(
      "/v1/slides",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (res) => {
        slideItems = res.body;
        fillSlidesHolder(res.body);
        return NotifyResult(res);
      }
    );
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        uploadFile(input.files[0], ({ file }) => {
          $("img.image_preview").attr("src", file.url);
          $("input.image").attr("value", file.url);
          oldimage = file.url;
        });
      };
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  function uploadFile(blobFile, cb) {
    var formData = new FormData();
    formData.append("image", blobFile);

    if (oldimage != "") {
      fetch("/v1/upload/delete", {
        method: "POST",
        body: JSON.stringify({ file: oldimage }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    $(".loading-spinner").removeClass("d-none");

    let html = $("#save_product").html();
    $("#save_product").html(
      '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Creating...'
    );
    // .attr("disabled", true);

    $.ajax({
      url: "/v1/upload",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        cb(response);
        $(".loading-spinner").addClass("d-none");
        $("#save_product").html(html);
      },
      error: function (jqXHR, textStatus, errorMessage) {
        NotifyResult({ message: "veuillez utiliser une image valide" });
        $(".form-control.feature_up").val("");
        $(".loading-spinner").addClass("d-none");
        $("#save_product").html(html);
      },
    });
  }

  $("input.feature_up").change(function () {
    readURL(this);
  });

  function slideItem(slideItem, index) {
    return `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${slideItem.picture}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${slideItem.title}</h5>
          <p class="card-text">${slideItem.desc}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" data-id='${index}'>EDIT</button>
            <button class="btn btn-danger" data-id='${index}'>REMOVE</button>
          </div>
        </div>
      </div>
    `;
  }
}
