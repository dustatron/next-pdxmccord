const customTheme = {
  styles: {
    body: {
      fontFamily: "Helvetica, arial, sans-serif",
      fontSize: "14px",
      lineHeight: "1.6",
      paddingTop: "10px",
      paddingBottom: "10px",
      padding: "30px",
      color: "#333",
    },

    global: {
      "*": {
        boxSizing: "border-box",
      },
      h1: {
        margin: "20px 0 10px",
        padding: "0",
        fontWeight: "bold",
        position: "relative",
        fontSize: "35px",
      },
      h2: {
        fontWeight: "500",
        lineHeight: "110%",
        fontSize: "28px",
        paddingTop: "2",
        paddingBottom: "1",
        borderBottom: "1px",
      },
      h3: {
        fontSize: "18px",
      },
      h4: {
        fontSize: "16px",
      },
      h5: {
        fontSize: "14px",
      },
      h6: {
        fontSize: "14px",
        color: "#777777",
      },
      p: {
        margin: "15px 0",
      },
      blockquote: { margin: "15px 0" },
      ul: { margin: "15px 0", paddingLeft: "30px" },
      ol: { margin: "15px 0", paddingLeft: "30px" },
      dl: {
        margin: "15px 0 5px",
        padding: "0",
        fontSize: "14px",
        fontWeight: "bold",
        fontStyle: "italic",
      },
      dt: {
        fontSize: "14px",
        fontWeight: "bold",
        fontStyle: "italic",
        padding: "0",
        margin: "15px 0 5px",
      },
      li: { margin: "15px 0" },
      table: { margin: "15px 0" },
      pre: { margin: "15px 0" },
    },
    hr: {
      border: "0 none",
      color: "#cccccc",
      height: "4px",
      padding: "0",
    },
    blockquote: {
      borderLeft: "4px solid #dddddd",
      padding: "0 15px",
      color: "#777777",
    },
    code: {
      margin: "0 2px",
      padding: "0 5px",
      whiteSpace: "nowrap",
      border: "1px solid #eaeaea",
      backgroundColor: "#f8f8f8",
      borderRadius: "3px",
    },
  },
}
export default customTheme
