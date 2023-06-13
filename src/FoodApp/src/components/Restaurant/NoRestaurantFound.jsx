import "./restaurantCard.scss";
import { RESTAURANT_NOT_FOUND_IMG_URL } from "../../utils/constants";

const NoRestaurantFound = () => {
  return (
    <div className="no-restaurant-container">
      <img
        src={RESTAURANT_NOT_FOUND_IMG_URL}
        alt="restaurant not found"
        className="no-res-found"
      />
      <span className="res-text">
        Uh-oh! Looks like the page you are trying to access, doesn't exist.
        Please start afresh.
      </span>
    </div>
  );
};

export default NoRestaurantFound;
