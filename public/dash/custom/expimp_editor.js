function initSingleBlog(defaultBlocks = [], type) {
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
    let data = [];
    let { blocks } = await editor.save();
    data.push({ name: "content", value: blocks });
    data = formArrayToJson(data);
    APIFetch(
      "/v1/page?type=" + type,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      (res) => {
        return NotifyResult(res);
      }
    );
  }
}
