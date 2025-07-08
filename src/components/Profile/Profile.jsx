import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import Sidebar from "../SideBar/SideBar";

export default function Profile({ onCardClick, clothingItems, open  }) {
  return (
    <div className="profile">

     
        <Sidebar />
    

      
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} onOpen={open} />

     


    </div>
  );
}
