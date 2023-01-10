import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { checkAuth, logout } from "./store/authSlice";


function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.auth)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [])
  if (data.isLoading) {
    return (
      <div>Завантаження...</div>
    ) 
  }

  if (!data.isAuth) {
    return (
      <LoginForm/>
    )
  }

  return (
    <div className="App">
        <h1>{data.isAuth ? `Користувач авторизований: ${data.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
        <button onClick={() => dispatch(logout())}>Вийти</button>
    </div>
  );
}

export default App;
