
import { useFetcher} from "react-router-dom";
import {useEffect, useState} from "react";
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
    fetcher.data = undefined;
    if (validate()) {
      fetcher.submit({email, password}, {action: '/login', method: 'POST'});
    }
  }

  useEffect(() => {
    if (fetcher.data) {
      resetErrorMessages();
      if (fetcher.data === 'auth/invalid-email') {
        setErrorEmail('Адрес электронной почты не валидный');
      } else if (fetcher.data === 'auth/user-disabled') {
        setErrorEmail('Пользователь отключен')
      } else if (fetcher.data === 'auth/user-not-found') {
        setErrorEmail('Пользователь с таким адресом электронной почты не найден');
      } else if (fetcher.data === 'auth/wrong-password') {
        setErrorPassword('Неверный пароль')
      } else if (fetcher.data === 'auth/invalid-credential') {
        setErrorEmail("Пароль или почта неверны");
        setErrorPassword('Пароль или почта неверны');
      } else if (fetcher.data === 'auth/too-many-requests') {
        setErrorEmail('Слишком много запросов. Повторите позже');
        setErrorPassword('Слишком много запросов. Повторите позже');
      }
    }

  }, [fetcher.data])




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
