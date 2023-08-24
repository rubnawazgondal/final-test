import styles from "./reusable_auth_page.module.css";
import plexaarLogo from "../../../assets/plexar.png";

const ReusableAuthPage = (props) => {
  return (
    <div className="container shadow rounded mt-5 text-center">
      <div className="row">
        <div className={`col-md-4 ${styles.backgroundImage}  bg-light`}>
          <div className="d-flex align-items-center h-100 justify-content-center">
            <img
              className="img-fluid"
              src={plexaarLogo}
              alt="Logo"
              height={249.19}
              width={156.02}
            />
          </div>
        </div>
        <div className="col-md-8 d-flex flex-column">
          <div className="m-auto">{props.children}</div>
          <hr />
          <p>
            Terms & Conditions • Privacy Policy • Copyright • Cookies Policy •
            Help <br /> © 2022 Selteq Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReusableAuthPage;
