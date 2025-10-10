
import { useFetcher} from "react-router-dom";
import {useState} from "react";
import "./css/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const clearFormData = () => (setEmail(""), setPassword(""));

  const resetErrorMessages = () => {
    setErrorEmail("");
    setErrorPassword("");
  }

  const validate = () => {
    resetErrorMessages();

    if (!email) {
      setErrorEmail("Адрес электронной почты не указан");
      return false;
    } if (!password) {
      setErrorPassword('Пароль не указан');
      return false;
    }
    return true;
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) {
      fetcher.submit({email, password}, {action: '/login', method: 'POST'});
    }
  }

  if (fetcher.data) {
    resetErrorMessages();
    switch (fetcher.data) {
      case "auth/invalid-email":
        setErrorEmail('Адрес электронной почты не валидный');
        break;
      case "auth/invalid-credential":
        setErrorEmail("Пароль или почта неверны");
        setErrorPassword('Пароль или почта неверны');
        break;
      case "auth/wrong-password":
        setErrorPassword('Неверный пароль')
        break;
      case "auth/user-disabled":
        setErrorEmail('Пользователь отключен')
        break;
      case "auth/user-not-found":
        setErrorEmail('Пользователь с таким адресом электронной почты не найден');
        break;
      case "auth/too-many-requests":
        setErrorEmail('Слишком много запросов. Повторите позже');
        setErrorPassword('Слишком много запросов. Повторите позже');
        break;
    }
    fetcher.data = undefined;
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
          {errorEmail && (
            <p className='errorText'>{errorEmail}</p>
          )}
        </div>

        <div>
          <label>
            Пароль
            <input type="password" onChange={evt => setPassword(evt.target.value)} />
          </label>
          {errorPassword && (
            <p className='errorText'>{errorPassword}</p>
          )}
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
