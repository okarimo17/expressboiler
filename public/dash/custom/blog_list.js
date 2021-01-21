function initBlogPage() {
  let newBlog = document.getElementById("new_blog");
  let rm_button = document.getElementById("rm_button");
  $(rm_button).click(function (ev) {
    let id = $(this).attr("data-id");
    showConfirmDialog(null, () => {
      removeBlog(id);
    });
  });
  newBlog.onclick = async (ev) => {
    let html = $("#new_blog").html();

    $("#new_blog")
      .html(
        '<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Creating...'
      )
      .attr("disabled", true);

    APIFetch("/v1/blog", {}, (res) => {
      if (!res.success) {
        $("#new_blog").html(html);
        return NotifyResult({ res });
      }
      setTimeout(() => {
        window.location.href = "blog/" + res.body;
      }, 150);
    });
  };

  async function removeBlog(blog_id) {
    APIFetch(
      `/v1/blog/${blog_id}`,
      {
        method: "DELETE",
      },
      (res) => {
        if (res.success) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        return NotifyResult(res);
      }
    );
  }
}
