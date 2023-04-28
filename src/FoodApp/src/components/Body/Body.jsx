import { useEffect, useRef, useState } from "react";
import ResturantCard from "../ResturantCard/ResturantCard";
import { useDebounce } from "../../customs/hooks/debounce";
import CardShimmer from "../shared/CardShimmer";
import NoResturantFound from "../ResturantCard/NoResturantFound";
import "./body.scss";

const Body = () => {
  const inputRef = useRef();

  //local state variables, whose scope is within the component.
  const [fetchedResturants, setFetchedResturants] = useState([]);
  const [resturants, setResturants] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce(searchText, 1000);

  const handleOnChange = (e) => {
    setSearchText(e.target.value.trimStart());
    setIsDirty(true);
  };

  const fetchAsyncAPI = async () => {
    setLoadingSpinner(true);
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      const resturantsCard = json?.data?.cards?.[2]?.data?.data?.cards;
      setFetchedResturants(resturantsCard);
      setResturants(resturantsCard);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSpinner(false);
    }
  };

  // fetch resturants card API
  useEffect(() => {
    fetchAsyncAPI();
  }, []);

  // load spinner on searchText changes
  useEffect(() => {
    setLoadingSpinner(true);
  }, [searchText]);

  // set resturants on searched text after debounce time & stop loading spinner
  useEffect(() => {
    if (isDirty && debounceSearchText) {
      setShowCancelBtn(true);
      setResturants(
        fetchedResturants.filter((card) =>
          card?.data?.name
            .toLowerCase()
            .includes(debounceSearchText.toLowerCase())
        )
      );
      setLoadingSpinner(false);
    } else if (isDirty && !debounceSearchText) {
      setSearchText("");
      setShowCancelBtn(false);
      setResturants([...fetchedResturants]);
      setLoadingSpinner(false);
    }
  }, [debounceSearchText]);

  return (
    <div className="body">
      <div className="res-selections-container ">
        <div className="res-search">
          <input
            type="text"
            name="resturant"
            value={searchText}
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
                      ...fetchedResturants.filter((card) => card?.data?.veg),
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
                      ...fetchedResturants.filter(
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
                      ...fetchedResturants.sort(
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
                      ...fetchedResturants.sort(
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
                onClick={() => setResturants([...fetchedResturants])}
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

      {/* using shimmer effect for better user experience */}

      {loadingSpinner ? (
        <CardShimmer numOfCard={30} />
      ) : resturants.length === 0 ? (
        <NoResturantFound />
      ) : (
        <div className="res-container">
          {resturants.map(({ data: card }) => {
            return <ResturantCard card={card} key={card?.id} />;
          })}

          {/* resturant card separate component as it resuable */}
        </div>
      )}
    </div>
  );
};

export default Body;
