import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <a href="">Lorem, ipsum.</a>
        </li>
        <li>
          <a href="">Lorem ipsum dolor sit.</a>
        </li>
      </ul>
      <h5 className="copyright">@copyright 2023</h5>

      <div className="res-address">
        <address>Lorem ipsum dolor sit amet.</address>
        <code>
          Contact: <i>+919334XXXXXX93</i>
        </code>
      </div>
    </div>
  );
};

export default Footer;
