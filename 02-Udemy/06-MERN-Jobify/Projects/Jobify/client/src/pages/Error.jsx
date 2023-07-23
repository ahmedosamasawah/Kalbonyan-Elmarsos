import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found!</h3>
        <p>We Can't Seem to Find the Page You're Looking For!</p>
        <Link to="/">Back Home?</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
