const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp2SyQhEI2W2R9JeF7CitSlkqGKjtoLAihYoy0IgrnTNhuyhDqtg0Guf5cUc4EGSuRv58&usqp=CAU";

const LOCATION_URL =
  "https://img.freepik.com/premium-vector/location-point-icon-vector-illustration_9999-17225.jpg?w=2000";

const RESTAURANT_NOT_FOUND_IMG_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/v1677828825/portal/m/seo_error_cat";

const LAT_LNG = "lat=27.4307473&lng=82.1805203";

const getImgUrl = (w, h) => {
  if (w & h)
    return `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_${w},h_${h},c_fill/`;
  return `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fill/`;
};

const MESSAGE_CARD = "messageCard";

export {
  LOGO_URL,
  LOCATION_URL,
  RESTAURANT_NOT_FOUND_IMG_URL,
  LAT_LNG,
  getImgUrl,
  MESSAGE_CARD,
};
