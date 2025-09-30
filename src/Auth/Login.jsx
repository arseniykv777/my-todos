import { login } from "./api";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Login({ currentUser }) {
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (evt) => setEmail(evt.target.value);
  const handlePassChange = (evt) => setPassword(evt.target.value);

  const clearFormData = () => (setEmail(""), setPassword(""));

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (typeof result !== "object") {
      console.log(result);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <section>
      <h1>Войти</h1>
      <form onSubmit={handleFormSubmit} onReset={clearFormData}>
        <label>
          Адрес электронной почты
          <input type="email" onChange={handleEmailChange} />
        </label>
        <label>
          Пароль
          <input type="password" onChange={handlePassChange} />
        </label>

        <div className="buttons">
          <button type="reset">Сброс</button>
          <button type="submit">Войти</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
