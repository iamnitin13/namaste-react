import { useRef, useState } from "react";
import ResturantCard from "../ResturantCard/ResturantCard";
import resturantList from "../../json/resturants.json";
import "./body.scss";

const Body = () => {
  const btnRef = useRef();
  const inputRef = useRef();

  //local state variables, whose scope is within the component.
  const [resturants, setResturants] = useState([...resturantList.cards]);

  return (
    <div className="body">
      <div className="res-selections-container ">
        <div className="res-search">
          <input
            type="search"
            name="resturant"
            ref={inputRef}
            placeholder="Type Resturant Name..."
            onChange={(e) =>
              e.target.value.length
                ? (btnRef.current.style.color = "#e36313cc")
                : (btnRef.current.style.color = "#c5c0c0c8")
            }
          />
          <button
            className="submit"
            type="submit"
            ref={btnRef}
            onClick={() =>
              setResturants(
                resturants.filter((card) =>
                  card?.data?.name
                    .toLowerCase()
                    .includes(inputRef.current.value.toLowerCase())
                )
              )
            }
          >
            Search
          </button>
        </div>
        <div className="res-filter">
          <button
            className="filter-btn"
            onClick={() =>
              setResturants([
                ...resturants.sort(
                  (cardA, cardB) =>
                    cardB?.data?.avgRating - cardA?.data?.avgRating
                ),
              ])
            }
          >
            Sort: Top to Low
          </button>
          <button
            className="filter-btn"
            onClick={() =>
              setResturants([
                ...resturants.sort(
                  (cardA, cardB) =>
                    cardA?.data?.avgRating - cardB?.data?.avgRating
                ),
              ])
            }
          >
            Sort: Low to Top
          </button>
          <button
            className="filter-btn reset-btn"
            onClick={() => {
              setResturants([...resturantList.cards]);
              inputRef.current.value = null;
              btnRef.current.style.color = "#c5c0c0c8";
            }}
          >
            RESET
          </button>
        </div>
      </div>

      <div className="res-container">
        {/* resturant card separate component as it resuable */}
        {resturants.map(({ data: card }) => {
          return <ResturantCard card={card} key={card?.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
