import { LOCATION_URL, RESTURANT_IMG_URL } from "../../utils/constants";
import "./resturantCard.scss";

const ResturantCard = ({ card }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    slaString,
    costForTwoString,
    veg,
    address,
  } = card;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={RESTURANT_IMG_URL + "/" + cloudinaryImageId}
        alt={name}
      />
      <div className="about">
        <h3 className="res-name">{name}</h3>
        <i className="res-cusinie">{cuisines.join()}</i>
        <span className="res-food-type" role={veg ? "veg" : "non-veg"} />
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

export default ResturantCard;
