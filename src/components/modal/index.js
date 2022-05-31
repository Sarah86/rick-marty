import { useState, useEffect } from "react";
import axios from "axios";
import { styles } from "./style";

const stylesheet = styles();

const Modal = ({ modalIsOpen, data, handleOnCloseClick }) => {
  const [episodeNames, setEpisodeNames] = useState([]);
  const [modalPosition, setModalPosition] = useState({
    top: 0,
  });
  const { name, gender, species, status, image, episode } = data;
  useEffect(() => {
    if (Array.isArray(episode)) {
      setEpisodeNames([]);
      episode.forEach((episode) => {
        axios(episode)
          .then((result) =>
            setEpisodeNames((prev) => [...prev, result.data.name])
          )
          .catch((err) => console.log(err.message));
      });
    }
  }, [episode]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setModalPosition({
        top: window.scrollY,
      });
    });
  }, []);
  return (
    <div
      style={styles({ modalIsOpen, modalPosition }).modalWrapper}
      onClick={handleOnCloseClick}
    >
      <div style={styles({ modalIsOpen }).modal}>
        <button style={stylesheet.close} onClick={handleOnCloseClick}>
          X
        </button>
        <div>
          <img alt={name} src={image} style={stylesheet.modalImage} />
          <div style={stylesheet.modalContent}>
            <ul style={stylesheet.list}>
              {Object.keys(data).map((key) => {
                const characterData = data[key];
                const label = <span style={stylesheet.label}>{key}</span>;
                if (!characterData) return null;
                const component = {
                  origin: characterData?.name,
                  location: characterData?.name,
                  gender,
                  name,
                  species,
                  status,
                  type: characterData,
                  episode: episodeNames && (
                    <ul>
                      {episodeNames.map((episodeName) => (
                        <li>{episodeName}</li>
                      ))}
                    </ul>
                  ),
                };
                if (component[key]) {
                  return (
                    <li key={key}>
                      <strong>{label}:</strong> {component[key]}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  modalIsOpen: false,
  data: {
    name: "",
    gender: "",
    species: "",
    status: "",
    image: "",
    episode: [],
  },
  handleOnCloseClick: () => null,
};

export default Modal;
