export const styles = (props) => {
  return {
    modalWrapper: {
      display: props?.modalIsOpen ? "flex" : "none",
      position: "absolute",
      zIndex: 3,
      height: "100vh",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      top: props?.modalPosition?.top,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      overflow: "hidden",
    },
    modal: {
      position: "relative",
      display: props?.modalIsOpen ? "block" : "none",
      backgroundColor: "#fff",
    },
    close: {
      position: "absolute",
      right: 0,
      margin: 10,
    },
    modalImage: {
      width: "100%",
      objectFit: "cover",
      height: 150,
    },
    modalContent: {
      overflowY: "auto",
      height: "100%",
      maxHeight: 250,
      padding: 20,
      margin: 0,
    },
    label: {
      textTransform: "capitalize",
    },
    list: {
      paddingBottom: 20,
    },
  };
};
