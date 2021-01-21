function initSingleBlog(defaultBlocks = []) {
  let oldimage = $("img.image_preview").attr("src");

  const editor = new EditorJS({
    holder: "editorjs",
    logLevel: "ERROR",
    // readOnly:true,
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: "Enter a header",
          levels: [3, 2],
          defaultLevel: 3,
        },
      },
      embed: {
        class: Embed,
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      // image: {
      //   class: ImageTool,
      //   config: {
      //     endpoints: {
      //       byFile: "/v1/upload", // Your backend file uploader endpoint
      //       // byUrl: 'http://localhost:8008/fetchUrl',
      //     },
      //   },
      // },
    },

    data: {
      blocks: defaultBlocks,
    },
  });

  $("form.content-form").submit(saveBlog);

  async function saveBlog(ev) {
    ev.preventDefault();

    if ($("input.image").val() == "") {
      return NotifyError("vous devez choisir une image de produit", false);
    }
    let data = $("form.content-form").serializeArray();
    let { blocks } = await editor.save();
    data.push({ name: "content", value: blocks });
    data = formArrayToJson(data);

    APIFetch(
      "/v1/blog",
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      (res) => {
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

    let html = $(".content-form .btn-primary").html();
    $(".content-form .btn-primary").html(
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
        $(".content-form .btn-primary").html(html);
      },
      error: function (jqXHR, textStatus, errorMessage) {
        NotifyResult({ message: "veuillez utiliser une image valide" });
        $(".form-control.feature_up").val("");
        $(".loading-spinner").addClass("d-none");
        $(".content-form .btn-primary").html(html);
      },
    });
  }

  $("input.feature_up").change(function () {
    readURL(this);
  });
}
