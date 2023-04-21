import { useRef } from "react";
import ResturantCard from "../ResturantCard/ResturantCard";
import resturants from "../../json/resturants.json";
import "./body.scss";

const Body = () => {
  const btnRef = useRef();

  return (
    <div className="body">
      <div className="res-search">
        <input
          type="search"
          name="resturant"
          placeholder="Type Resturant Name..."
          onChange={(e) =>
            e.target.value.length
              ? (btnRef.current.style.display = "#e36313cc")
              : (btnRef.current.style.color = "#c5c0c0c8")
          }
        />
        <button className="submit" type="submit" ref={btnRef}>
          Search
        </button>
      </div>
      <div className="res-container">
        {/* resturant card separate component as it resuable */}
        {resturants.cards.map(({ data: card }) => {
          return <ResturantCard card={card} key={card.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
