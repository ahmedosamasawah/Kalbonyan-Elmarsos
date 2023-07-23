import UserFinder from "./components/UserFinder";
import UsersContext from "./store/users-context";

const DUMMY_USERS = [
  { id: "u1", name: "ahmed" },
  { id: "u2", name: "yousef" },
  { id: "u3", name: "mansour" },
  { id: "u4", name: "max" },
  { id: "u5", name: "manuel" },
  { id: "u6", name: "julie" },
  { id: "u7", name: "karim" },
  { id: "u8", name: "raghep" },
  { id: "u9", name: "anas" },
  { id: "u10", name: "ziad" },
];

function App() {
  const usersContext = {
    users: DUMMY_USERS,
  };

  return (
    <UsersContext.Provider value={usersContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

export default App;
