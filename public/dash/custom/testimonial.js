function initTestimonialPage(testimonialItems = []) {
  let slidesHolder = $(".testimonials_holder");
  let testi_form = document.getElementById("testi_item_form");
  let edit_testi_modal = "#new_testi_modal";
  let oldimage;

  $("button#new_testimonial").click(openNewModal);

  testi_form.onsubmit = saveSlides;

  fillTestiHolder(testimonialItems);

  function openNewModal() {
    oldimage = "";
    fillForm({});
  }

  function fillTestiHolder(slides) {
    let content;
    if (slides.length)
      content = slides.map((item, index) => slideItem(item, index)).join("");
    else
      content = `<p class="lead"> aucun Témoignage existe, ajoutez-en un nouveau .</p>`;
    $(slidesHolder).html(content);

    $(`.testimonials_holder .card-body .btn.btn-primary`).click(function (ev) {
      let id = $(this).attr("data-id");
      let item = testimonialItems[id];
      fillForm(item);
    });
    $(`.testimonials_holder .card-body .btn.btn-danger`).click(function (ev) {
      let ind = $(this).attr("data-id");
      let { id } = testimonialItems[ind];
      removeSlide(id);
    });
  }

  function fillForm({ id = "-1", picture = "", content = "" }) {
    $(`${edit_testi_modal} input.id`).attr("value", `${id}`);
    $(`${edit_testi_modal} textarea.content`).text(`${content}`);

    $(`${edit_testi_modal} input.picture`).attr("value", `${picture}`);
    $(`${edit_testi_modal} input.feature_up`).attr("value", `${picture}`);
    $(`${edit_testi_modal} img.image_preview`).attr("src", `${picture}`);
    oldimage = picture;
    $(edit_testi_modal).modal();
  }

  async function removeSlide(testimonialId) {
    APIFetch(
      `/v1/testimonial/${testimonialId}`,
      {
        method: "DELETE",
      },
      (res) => {
        testimonialItems = res.body;
        fillTestiHolder(res.body);
        return NotifyResult(res);
      }
    );
  }

  async function saveSlides(ev) {
    ev.preventDefault();
    if ($("input.image").val() == "") {
      return NotifyError("vous devez choisir une image.", false);
    }
    let data = $(testi_form).serializeArray();

    data = formArrayToJson(data);

    APIFetch(
      "/v1/testimonial",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (res) => {
        testimonialItems = res.body;
        fillTestiHolder(res.body);
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
          <p class="card-text">${slideItem.content}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" data-id='${index}'>EDIT</button>
            <button class="btn btn-danger" data-id='${index}'>REMOVE</button>
          </div>
        </div>
      </div>
    `;
  }
}
