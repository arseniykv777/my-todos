import { login } from "./api";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./css/auth.css";

function Login({ currentUser }) {
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleEmailChange = (evt) => setEmail(evt.target.value);
  const handlePassChange = (evt) => setPassword(evt.target.value);

  const validate = () => {
    let errorEmailValidate = "";
    let errorPasswordValidate = "";

    if (!email) {
      errorEmailValidate = "Адрес электронной почты не указан";
    }
    if (!password) {
      errorPasswordValidate = "Пароль не указан";
    }

    setErrorEmail(errorEmailValidate);
    setErrorPassword(errorPasswordValidate);

    return !errorEmailValidate && !errorPasswordValidate;
  };

  const showErrorMessages = (code) => {
    if (code === "auth/invalid-credential") {
      setErrorEmail("Неверная почта или неверный пароль");
    } else if (code === "auth/user-not-found") {
      setErrorEmail("Пользователь с такой почтой не найден");
    }
  };

  const clearFormData = () => (setEmail(""), setPassword(""));

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    if (validate()) {
      console.log(123);
      const result = await login(email, password);

      if (typeof result !== "object") {
        showErrorMessages(result);
      }
    }
  };

  return (
    <section>
      <h1>Войти</h1>
      <form onSubmit={handleFormSubmit} onReset={clearFormData}>
        <div>
          <label>
            Адрес электронной почты
            <input type="email" onChange={handleEmailChange} />
          </label>
          {errorEmail && <p className="errorText">{errorEmail}</p>}
        </div>

        <div>
          <label>
            Пароль
            <input type="password" onChange={handlePassChange} />
          </label>
          {errorPassword && <p className="errorText">{errorPassword}</p>}
        </div>
        <div className="buttons">
          <button type="reset">Сброс</button>
          <button type="submit">Войти</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
