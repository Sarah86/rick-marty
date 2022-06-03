import { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as Star } from "./assets/star-svgrepo-com.svg";
import Modal from "./components/modal";
import { styles } from "./style";

const stylesheet = styles();

function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function App() {
  const [state, setState] = useState({
    status: "idle",
    data: {
      results: [],
      filteredResults: [],
      favorites: [],
    },
  });
  const [modal, setModal] = useState({
    status: "closed",
    data: {},
  });
  const [bodyScroll, setBodyScroll] = useState({
    status: "unlocked",
  });
  const [search, setSearch] = useState({
    value: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [pageControlled, setPageControlled] = useState([]);
  const [pages, setPages] = useState({
    pages: [1, 2, 3],
    number: 0,
  });
  const charactersByPage = 6;

  const modalIsOpen = modal.status === "open";
  const results = state.data.filteredResults || state.data.results;
  const isCurrentTarget = (e) => e.target === e.currentTarget;

  const favoriteExists = (character) =>
    favorites.find((favorite) => favorite.name === character.name);
  const onClick = ({ character, event }) => {
    if (!isCurrentTarget(event)) return null;
    setModal({
      status: "open",
      data: {
        ...character,
      },
    });
    setBodyScroll({
      status: "locked",
    });
  };

  const handleOnCloseClick = (e) => {
    if (!isCurrentTarget(e)) return null;
    setModal((prev) => ({
      ...prev,
      status: "closed",
    }));
    setBodyScroll({
      status: "unlocked",
    });
  };

  const handleInputChange = (e) => {
    setSearch({
      value: e.target.value,
    });
  };

  const handleFavoriteClick = ({ character, event }) => {
    event.stopPropagation();
    if (favoriteExists(character)) {
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.name !== character.name)
      );
    } else {
      setFavorites((prev) => [...prev, character]);
    }
  };

  const handlePageClick = (page) => {
    setPageControlled(paginate(results, charactersByPage, page));
  };

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((result) => {
        setState({
          status: "resolved",
          data: result.data,
        });
      })
      .catch((err) => {
        setState({
          status: "rejected",
          error: err.message,
        });
      });
  }, []);

  useEffect(() => {
    const isBodyLocked = bodyScroll.status === "locked";
    window.document.querySelector("body").style.overflow = isBodyLocked
      ? "hidden"
      : "auto";
  }, [bodyScroll.status]);

  useEffect(() => {
    const pageNumbers = Math.ceil(results?.length / charactersByPage);
    const pages = [...Array(pageNumbers)].map((_, i) => i + 1);
    setPageControlled(paginate(results, charactersByPage, 1));
    setPages((prev) => ({
      pages,
      number: pageNumbers,
    }));
  }, [results]);

  useEffect(() => {
    const filteredResults = state.data.results.filter((result) =>
      result.name.toLowerCase().includes(search.value.toLowerCase())
    );
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        filteredResults,
      },
    }));
  }, [search, state.data.results]);

  return (
    <div style={styles({ bodyScroll }).container}>
      <Modal
        modalIsOpen={modalIsOpen}
        data={modal.data}
        handleOnCloseClick={handleOnCloseClick}
      />
      <div style={stylesheet.header}>
        <h1>Rick and Morty</h1>
        <input
          type="text"
          name="search"
          value={search.value}
          placeholder="Search a character"
          onChange={handleInputChange}
        />
      </div>
      <div style={stylesheet.charactersContainer}>
        <div style={stylesheet.characters}>
          {pageControlled.map((character) => {
            const { name, image, id } = character;
            const isFavorite = favoriteExists(character);
            return (
              <div key={id} style={stylesheet.character}>
                <div style={stylesheet.thumbnailContainer}>
                  <img
                    alt={name}
                    src={image}
                    style={stylesheet.thumbnail}
                    onClick={(event) => onClick({ character, event })}
                  />
                  <button
                    style={stylesheet.star}
                    onClick={(event) =>
                      handleFavoriteClick({ character, event })
                    }
                  >
                    <Star style={styles({ isFavorite }).starPicture} />
                  </button>
                </div>
                <span>{name}</span>
              </div>
            );
          })}
        </div>
        <div style={stylesheet.favorites}>
          <h2 style={stylesheet.h2}>Favorite Characters</h2>
          <ul style={stylesheet.list}>
            {favorites.map((character) => (
              <li>{character.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {pages.pages.map((page) => (
          <button onClick={() => handlePageClick(page)} style={stylesheet.page} key={page}>{page}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
