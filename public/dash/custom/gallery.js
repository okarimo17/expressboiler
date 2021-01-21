function initGalleryPage(galleryItems = [], type) {
  let slidesHolder = $(".gallery_holder");
  let gallery_form = document.getElementById("gallery_item_form");
  let edit_gallery_modal = "#new_gallery_modal";
  let oldimage;
  console.log(galleryItems);
  $("button#new_gallery").click(openNewModal);

  gallery_form.onsubmit = saveSlides;
  fillGalleryHolder(galleryItems);

  function openNewModal() {
    oldimage = "";
    fillForm({});
  }

  function fillGalleryHolder(slides) {
    let content;
    if (slides.length)
      content = slides.map((item, index) => slideItem(item, index)).join("");
    else
      content = `<p class="lead"> aucun Gallery existe, ajoutez-en un nouveau .</p>`;
    $(slidesHolder).html(content);

    $(`.gallery_holder .card-body .btn.btn-primary`).click(function (ev) {
      let id = $(this).attr("data-id");
      let item = galleryItems[id];
      fillForm(item);
    });
    $(`.gallery_holder .card-body .btn.btn-danger`).click(function (ev) {
      let ind = $(this).attr("data-id");
      let { id } = galleryItems[ind];
      removeSlide(id);
    });
  }

  function fillForm({ id = "-1", picture = "", category = "" }) {
    // console.log(category);
    $(`${edit_gallery_modal} input.id`).attr("value", `${id}`);
    $(`${edit_gallery_modal} input.category`).attr("value", `${category}`);
    $(`${edit_gallery_modal} input.picture`).attr("value", `${picture}`);
    $(`${edit_gallery_modal} input.feature_up`).attr("value", `${picture}`);
    $(`${edit_gallery_modal} img.image_preview`).attr("src", `${picture}`);
    oldimage = picture;
    $(edit_gallery_modal).modal();
  }

  async function removeSlide(galleryId) {
    APIFetch(
      `/v1/gallery/${galleryId}`,
      {
        method: "DELETE",
      },
      (res) => {
        galleryItems = res.body;
        fillGalleryHolder(res.body);
        return NotifyResult(res);
      }
    );
  }

  async function saveSlides(ev) {
    ev.preventDefault();
    if ($("input.image").val() == "") {
      return NotifyError("vous devez choisir une image.", false);
    }
    let data = $(gallery_form).serializeArray();

    data = formArrayToJson(data);

    APIFetch(
      "/v1/gallery?type=" + type,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      (res) => {
        galleryItems = res.body;
        fillGalleryHolder(res.body);
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
      fetch("/v1/upload/delete?type" + type, {
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
          <h5 class="card-title">${slideItem.category}</h5>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" data-id='${index}'>EDIT</button>
            <button class="btn btn-danger" data-id='${index}'>REMOVE</button>
          </div>
        </div>
      </div>
    `;
  }
}
