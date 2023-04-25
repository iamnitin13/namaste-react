import { useCallback, useEffect, useRef, useState } from "react";
import ResturantCard from "../ResturantCard/ResturantCard";
import resturantList from "../../json/resturants.json";
import "./body.scss";
import { useDebounce } from "../../customs/hooks/debounce";
import LoadingSpinner from "../shared/LoadingSpinner";

const Body = () => {
  const inputRef = useRef();

  //local state variables, whose scope is within the component.
  const [resturants, setResturants] = useState([...resturantList.cards]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 1000);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const handleOnChange = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    if (searchTerm.trim().length) setLoadingSpinner(true);
  }, [searchTerm]);

  useEffect(() => {
    if (debounceSearchTerm) {
      setShowCancelBtn(true);
      setResturants(
        resturants.filter((card) =>
          card?.data?.name
            .toLowerCase()
            .includes(debounceSearchTerm.toLowerCase())
        )
      );
    } else {
      inputRef.current.value = null;
      setShowCancelBtn(false);
      setResturants([...resturantList.cards]);
    }
    setLoadingSpinner(false);
  }, [debounceSearchTerm]);

  return (
    <div className="body">
      <div className="res-selections-container ">
        <div className="res-search">
          <input
            type="text"
            name="resturant"
            ref={inputRef}
            placeholder="Type Resturant Name..."
            onChange={(e) => handleOnChange(e)}
          />
          {showCancelBtn ? (
            <button className="cancel-btn" onClick={handleOnChange}>
              x
            </button>
          ) : null}
        </div>
        <div className="res-filter">
          {filterToggle ? (
            <div className="filter-flex">
              <div className="filter-options-list">
                <button
                  className="filter-btn"
                  style={{ color: "green" }}
                  onClick={() =>
                    setResturants([
                      ...resturantList.cards.filter((card) => card?.data?.veg),
                    ])
                  }
                >
                  Veg
                </button>

                <button
                  className="filter-btn"
                  style={{ color: "#5d0909d4" }}
                  onClick={() =>
                    setResturants([
                      ...resturantList.cards.filter(
                        (card) => card?.data?.veg === false
                      ),
                    ])
                  }
                >
                  Non-Veg
                </button>

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
                  Rating: Top to Low
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
                  Rating: Low to Top
                </button>
              </div>
              <button
                className="filter-btn reset-btn"
                onClick={() => setResturants([...resturantList.cards])}
              >
                RESET
              </button>
              <button
                onClick={() => {
                  setFilterToggle(false);
                }}
                className="filter-btn filter-close-btn"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <span
              className="filter-toggle"
              onClick={() => {
                setFilterToggle(true);
              }}
            >
              Filter
            </span>
          )}
        </div>
      </div>

      {loadingSpinner ? <LoadingSpinner /> : null}

      <div className={`res-container ${loadingSpinner && "backdrop-opacity"}`}>
        {/* resturant card separate component as it resuable */}
        {resturants.map(({ data: card }) => {
          return <ResturantCard card={card} key={card?.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
