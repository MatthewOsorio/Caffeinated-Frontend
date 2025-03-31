import "../css/InfoCardComponent.css";
import instagram from "../assets/icons/insta_logo.png";
import twitter from "../assets/icons/twitter_logo.png";
import facebook from "../assets/icons/facebook_logo.png";
import location from "../assets/icons/location.png";
import global from "../assets/icons/global.png";
import phone from "../assets/icons/phone.png";

function InfoCardComponent({ coffeeShop }) {
  return (
    <div className="info-card">
      <div className="info-component">
        <img className="info-icon" src={location} />
        <div>{coffeeShop.location.formatted_address}</div>
      </div>

      {coffeeShop.website && (
        <a className="info-component" href={coffeeShop.website}>
          <img className="info-icon" src={global} />
          <div>{coffeeShop.website && <div>{coffeeShop.website}</div>}</div>
        </a>
      )}

      {coffeeShop.tel && (
        <div className="info-component">
          <img className="info-icon" src={phone} />
          <div>{coffeeShop.tel}</div>
        </div>
      )}

      <div>
        {Object.keys(coffeeShop.social_media).length > 0 && (
          <div className="social-media">
            {coffeeShop.social_media.instagram && (
              <div>
                <a
                  href={`http://instagram.com/${coffeeShop.social_media.instagram}`}
                >
                  <img className="social-media-logo" src={instagram} />
                </a>
              </div>
            )}

            {coffeeShop.social_media.twitter && (
              <div>
                <a
                  href={`http://twitter.com/${coffeeShop.social_media.twitter}`}
                >
                  <img className="social-media-logo" src={twitter} />
                </a>
              </div>
            )}

            {coffeeShop.social_media.facebook_id && (
              <div>
                <a
                  href={`http://facebook.com/${coffeeShop.social_media.facebook_id}`}
                >
                  <img className="social-media-logo" src={facebook} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoCardComponent;
