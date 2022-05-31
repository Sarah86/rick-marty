export const styles = (props) => {
  return {
    container: {
      height: "100%",
    },
    header: {
      textAlign: "center",
      padding: "1em",
    },
    characters: {
      display: "flex",
      flexWrap: "wrap",
      flex: "1 1 100%",
      justifyContent: 'center',
    },
    character: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: 10,
      margin: 5,
      maxWidth: 150,
      width: '100%'
    },
    charactersContainer: {
      display: "flex",
    },
    thumbnailContainer: {
      position: "relative",
      marginBottom: 10,
    },
    thumbnail: {
      width: '100%',
    },
    favorites: {
      flex: "1 3 100%",
    },
    star: {
      position: "absolute",
      bottom: 10,
      right: 5,
      width: 30,
    },
    starPicture: {
      fill: props?.isFavorite ? 'orange' : 'grey'
    }
  };
};
