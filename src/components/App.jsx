import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { coordinates, APIkey } from "../utils/constants";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import Footer from "./Footer/footer";
import CurrentTemperatureUnitContext from "../current/currentTemperatureContext";
import AddItemModal from "./AddItemModal/AddItemModal";
import Profile from "./Profile/Profile";
import { addItem, deleteItem, getItems } from "../utlis/api";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  console.log(weatherData);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // Fixed useState
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
    console.log(132131);
    setActiveModal("preview");
    setSelectedCard(card);
  };
  //filter the list of cards to remove the just deleted card
  //close the modal

  const handleCardDelete = () => {
    // console.log(selectedCard);
    deleteItem(selectedCard._id).then((res) => {
      // remove card from your view/card list
      const updatedItems = clothingItems.filter(
        (item) => item._id !== selectedCard._id
      );
      setClothingItems(updatedItems);
      // close modal
      closeActiveModal();
    });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onCardDelete = () => {
    setActiveModal("confirm-delete");
  };


  const handAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    //updateClothingItemsArray

    addItem({ name, imageUrl, weather, id: newId })
      .then((item) => {
        console.log(item);
        //close the modal
        setClothingItems([
          { name, imageUrl: imageUrl, weather, _id: newId },
          ...clothingItems,
        ]);
        closeActiveModal();
      })
      .catch(console.error);
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

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        //set clothing items
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  open={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handAddItemModalSubmit}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onCardDelete={onCardDelete}
        />

        <ConfirmDeleteModal
          onClose={closeActiveModal}
          isOpen={activeModal === "confirm-delete"}
          handleDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
