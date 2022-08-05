import "./styles.css";
import { useAuthStore } from "./store";

export default function App() {
  const {
    login,
    accessToken,
    clearTimer,
    timerId,
    accessTokenExpiry
  } = useAuthStore();

  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <button onClick={clearTimer}>Clear timer</button>
      {accessToken}
      {timerId}
      {accessTokenExpiry}
    </div>
  );
}
