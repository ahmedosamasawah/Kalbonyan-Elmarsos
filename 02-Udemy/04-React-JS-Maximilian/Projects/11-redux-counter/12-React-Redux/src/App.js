import Auth from "./components/Auth";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Header />
      {isAuth ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
