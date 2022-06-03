export const styles = (props) => {
  return {
    container: {
      height: "100%",
      padding: 30,
    },
    header: {
      textAlign: "center",
      padding: "1em",
    },
    characters: {
      display: "flex",
      flexWrap: "wrap",
      flex: "1 1 100%",
      margin: 5
    },
    character: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: 10,
      margin: 5,
      maxWidth: 150,
      width: "100%",
    },
    charactersContainer: {
      display: "flex",
      minHeight: 500,
      marginTop: 50
    },
    thumbnailContainer: {
      position: "relative",
      marginBottom: 10,
    },
    thumbnail: {
      width: "100%",
    },
    favorites: {
      flex: "1 1 100%",
      textAlign: "center",
      margin: 5
    },
    h2: {
      marginTop: 0,
      marginBotom: 20
    },
    list: {
      listStyleType: 'none', 
    },
    star: {
      position: "absolute",
      bottom: 10,
      right: 5,
      width: 30,
    },
    starPicture: {
      fill: props?.isFavorite ? "orange" : "grey",
    },
    page: {
      marginRight: 5
    }
  };
};
