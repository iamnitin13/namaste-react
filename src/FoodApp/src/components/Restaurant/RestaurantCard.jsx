import { LOCATION_URL, getImgUrl } from "../../utils/constants";
import "./restaurantCard.scss";

const RestaurantCard = ({ card }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    slaString,
    costForTwoString,
    veg,
    address,
    id,
  } = card;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={getImgUrl(508, 320) + cloudinaryImageId}
        alt={name}
      />
      <div className="about">
        <h3 className="res-name">{name}</h3>
        <i className="res-cusinie">{cuisines?.join()}</i>
        <div className="food-type-box">
          <span className="res-food-type" role={veg ? "veg" : "non-veg"} />
        </div>
      </div>
      <hr />
      <div className="res-info">
        <ul>
          <li>{!isNaN(avgRating) ? `${avgRating} stars` : avgRating}</li>
          <li>{slaString}</li>
          <li>{costForTwoString}</li>
        </ul>
        <hr />
        <address>
          <img src={LOCATION_URL} alt="location-logo" />
          <span>{address}</span>
        </address>
      </div>
    </div>
  );
};

export default RestaurantCard;
