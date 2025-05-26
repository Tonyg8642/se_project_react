import { useEffect, useState } from "react";
import { coordinates, APIkey } from "../utils/constants";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import Footer from "./Footer/footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    // type: "",
    // temp: { F: 999 },
    // city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // Fixed useState

  const handleAddClick = () => {
    // const card = {
    //   name: "Sample Garment",
    //   imageUrl: "https://example.com/image.jpg",
    //   weather: "cold",
    // }; // You can replace this with actual data
    console.log("is this firing");
    setActiveModal("add-garment");
    // setSelectedCard(card);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [coordinates, APIkey]);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer/>
      </div>

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="image-url" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="image-url"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the Weather type:</legend>

          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
