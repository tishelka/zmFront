import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuthPage.scss";

export const UserAuthPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const SignIn = () => {
    axios
      .get("http://localhost:3000/users", {
        params: { email: email },
      })
      .then((response) => {
        if (response.data.length > 0) {
          alert("Этот мэйл уже зарегистрирован.");
          return;
        }
        axios
          .post("http://localhost:3000/users", {
            email: email,
            password,
          })
          .then(() => {
            alert("Успешная регистрация!");
            navigate("main");
          })
          .catch((error) => {
            console.error("Ошибка регистрации:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка проверки регистрации:", error);
      });
  };

  const LogIn = () => {
    axios
      .get("http://localhost:3000/users", {
        params: { email: email, password },
      })
      .then((response) => {
        if (response.data.length === 0) {
          alert("Неправильный мэйл или пароль.");
          return;
        }
        alert("Успешный логин!");
        navigate("main");
      })
      .catch((error) => {
        console.error("Ошибка логина:", error);
      });
  };

  return (
    <div className="authPageContainer">
      <div className="authPageInputs">
        <div className="authInput">
          <h2>Почта</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="authInput">
          <h2>Пароль</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="authPageButtons">
        <button onClick={SignIn}>Зарегистрироваться</button>
        <button onClick={LogIn}>Войти</button>
      </div>
    </div>
  );
};
