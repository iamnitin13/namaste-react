import { Children, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LAT_LNG, LOCATION_URL, getImgUrl } from "../../utils/constants";
import "./restaurantMenu.scss";
import LoadingSpinner from "../shared/LoadingSpinner";

const RestaurantMenu = () => {
  const { id: restaurantId } = useParams(); // read dynamice url params destructing the id & aliasing to restaurantId
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState(null);
  const [items, setItems] = useState(null);
  const [defaultItems, setDefaultItems] = useState(null);
  const [showMenu, setShowMenu] = useState([]);
  const [isVegSel, setIsVegSel] = useState(false);

  const getRestaurantInfo = async () => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&${LAT_LNG}&restaurantId=${restaurantId}`
      );
      const json = await data.json();
      setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);
      setOffers(
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.offers
      );
      setItems(
        json?.data?.cards?.[json?.data?.cards?.length - 1]?.groupedCard
          ?.cardGroupMap?.REGULAR?.cards
      );
      setDefaultItems(
        json?.data?.cards?.[json?.data?.cards?.length - 1]?.groupedCard
          ?.cardGroupMap?.REGULAR?.cards
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const handleShowMenuArrows = (index) =>
    setShowMenu((prev) => {
      if (prev.includes(index)) return prev?.filter((idx) => idx !== index);
      return [...prev, index];
    });

  const handleVegSelection = () => {
    if (isVegSel) {
      setIsVegSel(false);
      setItems(defaultItems);
    } else {
      setIsVegSel(true);
      const filterItem = defaultItems
        ?.slice(1, defaultItems?.length - 2)
        .filter(({ card: { card } }) => {
          card?.categories;
        });
      setItems();
      console.log(defaultItems);
    }
  };

  const ArrowComponent = ({ showUpArrow }) =>
    showUpArrow ? (
      <div className="arrow-key">🔽</div>
    ) : (
      <div className="arrow-key">🔼</div>
    );

  const MenuCardComponent = ({ card, index }) => {
    return (
      <Fragment>
        <div
          className="filter-title-container"
          onClick={() => handleShowMenuArrows(index)}
        >
          <h3 className="filter-title">
            {card?.title}
            <span>({card?.itemCards?.length})</span>
          </h3>
          <ArrowComponent showUpArrow={showMenu.includes(index)} />
        </div>
        <MenuListComponent list={card} hasHidden={showMenu.includes(index)} />
      </Fragment>
    );
  };

  const MenuCategoriesComponent = ({ card, categories }) => {
    return (
      <Fragment>
        <div className="filter-title-container" style={{ cursor: "auto" }}>
          <h3 className="filter-title">{card?.title}</h3>
        </div>
        {categories?.map((category, index) => {
          return (
            <Fragment key={category?.title}>
              <div
                className="filter-title-container"
                style={{ fontSize: "1rem", fontWeight: 500 }}
                onClick={() => handleShowMenuArrows(index)}
              >
                <p className="filter-title">
                  {category?.title}
                  <span>({category?.itemCards?.length})</span>
                </p>
                <ArrowComponent showUpArrow={!showMenu.includes(index)} />
              </div>
              <MenuListComponent
                list={category}
                hasHidden={!showMenu.includes(index)}
              />
              <hr
                style={{ marginBlock: "0.5rem" }}
                hidden={index === categories.length - 1}
              />
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  const MenuListComponent = ({ list, hasHidden }) => {
    return (
      <div hidden={hasHidden}>
        {list?.itemCards?.map(({ card: { info } }, index) => {
          return (
            <Fragment key={info?.id}>
              <div
                key={info?.id}
                className="food-item"
                aria-disabled={info?.inStock}
              >
                <div className="food-type-box">
                  <div
                    className="res-food-type"
                    role={
                      info?.itemAttribute?.vegClassifier == "NONVEG"
                        ? "non-veg"
                        : "veg"
                    }
                  />
                </div>
                <div className="food-content">
                  <h4 className="food-name">{info?.name}</h4>

                  <div className="food-price">
                    {info?.price && "₹" + info?.price / 100}
                  </div>
                  <div className="food-description">{info?.description}</div>
                </div>
                <div className="food-img-contain">
                  {info?.imageId ? (
                    <img
                      src={getImgUrl(208, 208) + info?.imageId}
                      alt={info?.name}
                    />
                  ) : null}
                  <button className="add-item-btn">
                    Add
                    <span>+</span>
                  </button>
                </div>
              </div>

              <hr
                style={{ marginBlock: "0.5rem" }}
                hidden={index === list?.itemCards?.length - 1}
              />
            </Fragment>
          );
        })}
      </div>
    );
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="res-menu-container">
      <div className="res-info">
        <img
          className="res-img"
          src={getImgUrl(508, 320) + restaurantInfo?.cloudinaryImageId}
          alt={restaurantInfo?.name}
        />
        <div className="info-flex">
          <h4 className="res-name">{restaurantInfo?.name}</h4>
          <div className="res-cusinie">{restaurantInfo?.cuisines?.join()}</div>
          <div className="res-area-km">
            {restaurantInfo?.areaName},
            {restaurantInfo?.sla?.lastMileTravelString}
          </div>
        </div>

        <div className="res-rating">
          <span className="rating-point">
            {restaurantInfo?.avgRatingString}
          </span>
          <hr />
          <div className="total-rating">
            {restaurantInfo?.totalRatingsString}
          </div>
        </div>
      </div>

      <div className="res-delivery-msg">
        <img
          className="res-delivery-icon"
          src={getImgUrl() + restaurantInfo?.feeDetails?.icon}
          alt="fees detail icon"
        />
        <div className="message">{restaurantInfo?.feeDetails?.message}</div>
      </div>

      <hr className="dotted-border" />

      <div className="res-fare-time">
        <ul>
          <li>
            <div className="duration-icon" />
            {restaurantInfo?.sla?.slaString}
          </li>
          <li>
            <div className="money-icon">₹</div>
            {restaurantInfo?.costForTwoMessage}
          </li>
        </ul>
      </div>

      <div className="res-menu-coupons">
        {offers?.map(({ info }) => {
          return (
            <div className="coupons-card" key={info?.offerIds.join()}>
              <div className="img-text">
                <img
                  src={getImgUrl(28, 28) + info?.offerLogo}
                  alt={info?.header}
                />
                <h6>{info?.header}</h6>
              </div>
              <div className="coupon-msg">
                {info?.couponCode} | {info?.description}
              </div>
            </div>
          );
        })}
      </div>

      <div className="veg-selection">
        <div className="veg-text">Veg</div>
        <div
          className={`btn-container ${isVegSel && "vegSelClass"}`}
          onClick={handleVegSelection}
        >
          <div className={`block ${isVegSel && "mvPosBlock"}`}>
            {isVegSel ? <div className="veg-circle" /> : null}
          </div>
        </div>
      </div>

      <hr />

      <div className="res-item-container">
        {items
          ?.slice(1, items?.length - 2)
          ?.map(({ card: { card } }, index) => (
            <div key={card?.title} className="filter-container">
              {card?.categories && (
                <MenuCategoriesComponent
                  card={card}
                  categories={card?.categories}
                />
              )}

              {card?.itemCards && (
                <MenuCardComponent card={card} index={index} />
              )}

              {index < items?.slice(1, items?.length - 2)?.length - 1 ? (
                <hr className="border-end" />
              ) : null}
            </div>
          ))}
      </div>

      <div className="res-item-footer">
        <div className="footer-content-first">
          <img
            src={
              getImgUrl(120, 60) +
              items?.[items?.length - 2]?.card?.card?.imageId
            }
            width={60}
            height={30}
            alt={items?.[items?.length - 2]?.card?.card?.type}
          />
          <span>{items?.[items?.length - 2]?.card?.card?.text?.[0]}</span>
        </div>
        <hr />
        <div className="footer-content-second">
          <p className="name">{items?.[items?.length - 1]?.card?.card?.name}</p>
          <p className="area">
            (Outlet:{items?.[items?.length - 1]?.card?.card?.area})
          </p>
          <p className="location">
            <img
              src={LOCATION_URL}
              alt="location-logo"
              width={20}
              height={20}
            />
            {items?.[items?.length - 1]?.card?.card?.completeAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
