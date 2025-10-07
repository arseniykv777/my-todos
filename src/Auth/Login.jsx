
import { useFetcher} from "react-router-dom";
import { useState } from "react";
import "./css/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();

  const clearFormData = () => (setEmail(""), setPassword(""));

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    fetcher.submit({email, password}, {action: '/login', method: 'POST'});
  }


  return (
    <section>
      <h1>Войти</h1>
      <form onSubmit={handleFormSubmit} onReset={clearFormData}>
        <div>
          <label>
            Адрес электронной почты
            <input type="email" onChange={evt => setEmail(evt.target.value)} />
          </label>
        </div>

        <div>
          <label>
            Пароль
            <input type="password" onChange={evt => setPassword(evt.target.value)} />
          </label>
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
