import { useEffect, useMemo, useRef, useState } from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useDebounce } from "../../customs/hooks/debounce";
import CardShimmer from "../shared/CardShimmer";
import NoRestaurantFound from "../Restaurant/NoRestaurantFound";
import "./body.scss";
import { LAT_LNG, MESSAGE_CARD } from "../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Body = () => {
  const inputRef = useRef();

  //local state variables, whose scope is within the component.
  const [fetchedRestaurants, setFetchedRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debounceSearchText = useDebounce(searchText, 1000);
  const [pagIndex, setPageIndex] = useState({ offset: 15, totalSize: 0 });

  const restaurantKeys = useMemo(() => {
    return [
      "name",
      "cuisines",
      "cloudinaryImageId",
      "avgRating",
      "slaString",
      "costForTwoString",
      "veg",
      "address",
      "id",
    ];
  }, [fetchedRestaurants]);

  const handleOnChange = (e) => {
    setSearchText(e?.target?.value?.trimStart());
    setIsDirty(true);
  };

  const fetchAsyncAPI = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?${LAT_LNG}&page_type=DESKTOP_WEB_LISTING`,
        {}
      );
      const json = await data?.json();
      const restaurantsCard = json?.data?.cards?.[2]?.data?.data?.cards?.map(
        (card) => card?.data
      );

      setFetchedRestaurants(restaurantsCard);
      setRestaurants(restaurantsCard);
      setPageIndex((prev) => {
        return {
          ...prev,
          totalSize: json?.data?.cards?.[2]?.data?.data?.totalOpenRestaurants,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSpinner(false);
    }
  };

  // infinite scroll swiggy api for 2second time
  const fetchInfinite = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?${LAT_LNG}&offset=${pagIndex?.offset}&page_type=DESKTOP_SEE_ALL_LISTING`
      );
      const json = await data?.json();
      const restaurantsCard = json?.data?.cards
        ?.filter((card) => card?.data?.cardType !== MESSAGE_CARD)
        .map((card) => card?.data?.data);

      setFetchedRestaurants((prev) => prev.concat(restaurantsCard));
      setRestaurants((prev) => prev.concat(restaurantsCard));

      setPageIndex((prev) => {
        return {
          ...prev,
          offset: json?.data?.currentOffset + 16,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSpinner(false);
    }
  };

  // fetch restaurants card API
  useEffect(() => {
    fetchAsyncAPI();
  }, []);

  // load spinner on searchText changes
  useEffect(() => {
    setLoadingSpinner(true);
  }, [searchText]);

  // set restaurants on searched text after debounce time & stop loading spinner
  useEffect(() => {
    if (isDirty && debounceSearchText) {
      setShowCancelBtn(true);
      setRestaurants(
        fetchedRestaurants?.filter((card) =>
          card?.data?.name
            ?.toLowerCase()
            ?.includes(debounceSearchText?.toLowerCase())
        )
      );
      setLoadingSpinner(false);
    } else if (isDirty && !debounceSearchText) {
      setSearchText("");
      setShowCancelBtn(false);
      setRestaurants([...fetchedRestaurants]);
      setLoadingSpinner(false);
    }
  }, [debounceSearchText]);

  return (
    <div className="body">
      <div className="res-selections-container ">
        <div className="res-search">
          <input
            type="text"
            name="restaurant"
            value={searchText}
            ref={inputRef}
            placeholder="Type Restaurant Name..."
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
                    setRestaurants([
                      ...fetchedRestaurants?.filter((card) => card?.data?.veg),
                    ])
                  }
                >
                  Veg
                </button>

                <button
                  className="filter-btn"
                  style={{ color: "#5d0909d4" }}
                  onClick={() =>
                    setRestaurants([
                      ...fetchedRestaurants?.filter(
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
                    setRestaurants(
                      [...fetchedRestaurants]?.sort(
                        (cardA, cardB) =>
                          cardB?.data?.avgRating - cardA?.data?.avgRating
                      )
                    )
                  }
                >
                  Rating: Top to Low
                </button>
                <button
                  className="filter-btn"
                  onClick={() =>
                    setRestaurants(
                      [...fetchedRestaurants]?.sort(
                        (cardA, cardB) =>
                          cardA?.data?.avgRating - cardB?.data?.avgRating
                      )
                    )
                  }
                >
                  Rating: Low to Top
                </button>
              </div>
              <button
                className="filter-btn reset-btn"
                onClick={() => setRestaurants([...fetchedRestaurants])}
              >
                RESET
              </button>
              <button
                onClick={() => setFilterToggle(false)}
                className="filter-btn filter-close-btn"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <span
              className="filter-toggle"
              onClick={() => setFilterToggle(true)}
            >
              Filter
            </span>
          )}
        </div>
      </div>

      {/* using shimmer effect for better user experience */}

      {loadingSpinner ? (
        <CardShimmer numOfCard={20} />
      ) : restaurants?.length === 0 ? (
        <NoRestaurantFound />
      ) : (
        <InfiniteScroll
          dataLength={restaurants?.length}
          next={fetchInfinite}
          hasMore={restaurants?.length <= pagIndex?.totalSize}
          loader={<CardShimmer numOfCard={20} />}
          style={{ overflow: "none" }}
        >
          <div className="res-container">
            {restaurants
              ?.filter((restaurant) => {
                return (
                  restaurant &&
                  restaurantKeys.every((key) =>
                    Object.keys(restaurant).includes(key)
                  )
                );
              })
              .map((restaurant, index) => {
                return (
                  <Link key={index} to={"/restaurants/" + restaurant?.id}>
                    <RestaurantCard card={restaurant} />
                  </Link>
                );
              })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Body;
