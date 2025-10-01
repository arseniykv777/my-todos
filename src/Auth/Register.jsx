import { register } from "./api";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./css/register.css";

function Register({ currentUser }) {
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    errorEmail: "",
    errorPassword: "",
    errorPasswordConfirm: "",
  });

  const handleEmailChange = (evt) => setFormData({ ...formData, email: evt.target.value });
  const handlePassChange = (evt) => setFormData({ ...formData, password: evt.target.value });
  const handlePasswordConfirmChange = (evt) => setFormData({ ...formData, passwordConfirm: evt.target.value });

  const clearFormData = () => setFormData({ email: "", password: "", passwordConfirm: "" });

  const validate = () => {
    const errors = {
      errorEmail: "",
      errorPassword: "",
      errorPasswordConfirm: "",
    };

    if (!formData.email) {
      errors.errorEmail = "Адрес электронной почты не указан";
    }
    if (!formData.password) {
      errors.errorPassword = "Пароль не указан";
    }
    if (!formData.passwordConfirm) {
      errors.errorPasswordConfirm = "Повторный пароль не указан";
    }
    if (formData.password !== formData.passwordConfirm) {
      errors.errorPassword = "Пароли не совпадают";
      errors.errorPasswordConfirm = "Пароли не совпадают";
    }

    setErrorFormData(errors);
    return !errors.errorEmail && !errors.errorPassword && !errors.errorPasswordConfirm;
  };

  const showErrorMessages = (code) => {
    if (code === "auth/weak-password") {
      setErrorFormData({
        ...errorFormData,
        errorPassword: "Слишком простой Пароль",
        errorPasswordConfirm: "Слишком простой Пароль",
      });
    } else if (code === "auth/email-already-in-use") {
      setErrorFormData({ ...errorFormData, errorEmail: "Эта почта уже используется" });
    }
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    if (validate()) {
      const result = await register(formData["email"], formData["password"]);
      if (typeof result !== "object") {
        showErrorMessages(result);
      }
    }
  };

  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={handleFormSubmit} onReset={clearFormData}>
        <div>
          <label>
            Адрес электронной почты
            <input type="email" onChange={handleEmailChange} />
          </label>
          {errorFormData.errorEmail && <p className="errorText">{errorFormData.errorEmail}</p>}
        </div>
        <div>
          <label>
            Пароль
            <input type="password" onChange={handlePassChange} />
          </label>
          {errorFormData.errorPassword && <p className="errorText">{errorFormData.errorPassword}</p>}
        </div>
        <div>
          <label>
            Повторите пароль
            <input type="password" onChange={handlePasswordConfirmChange} />
          </label>
          {errorFormData.errorPasswordConfirm && <p className="errorText">{errorFormData.errorPasswordConfirm}</p>}
        </div>
        <div className="buttons">
          <button type="reset">Сброс</button>
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </section>
  );
}

export default Register;
