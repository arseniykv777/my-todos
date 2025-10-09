import { useState } from "react";
import "./css/auth.css";
import {useFetcher} from "react-router-dom";
import {useEffect} from "react";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm , setPasswordConfirm] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  const fetcher = useFetcher();

  const clearFormData = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  }

  const resetErrorMessages = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
  }

  const validate = () => {
    resetErrorMessages();

    if (!email) {
      setErrorEmail("Адрес электронной почты не указан");
      return false;
    } if (!password) {
      setErrorPassword('Пароль не указан');
      return false;
    } if (!passwordConfirm) {
      setErrorPasswordConfirm('Повтор пароля не указан');
      return false;
    } if (passwordConfirm !== password) {
      setErrorPasswordConfirm('Пароли не совпадают');
      setErrorPassword('Пароли не совпадают')
      return false;
    }
    return true;
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (validate()) {
      fetcher.submit({email, password }, {action: '/register', method: 'POST'});
    }
  }

  useEffect(() => {
    if (fetcher.data) {
      resetErrorMessages();
      if (fetcher.data === 'auth/email-already-in-use') {
        setErrorEmail('Посетитель с таким адресом электроной почты уже зарегистрирован');
      } else if (fetcher.data === 'auth/weak-password') {
        setErrorPassword('Слишком простой пароль');
        setErrorPasswordConfirm('Слишком простой пароль');
      } else if (fetcher.data === 'auth/too-many-requests') {
        setErrorEmail('Слишком много запросов. Повторите позже');
        setErrorPassword('Слишком много запросов. Повторите позже');
        setErrorPasswordConfirm('Слишком много запросов. Повторите позже');
      }
    }
  }, [fetcher.data])


  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={handleFormSubmit} onReset={clearFormData}>
        <div>
          <label>
            Адрес электронной почты
            <input type="email" onChange={(evt) => setEmail(evt.target.value)} />
          </label>
          {errorEmail && (
            <p className='errorText'>{errorEmail}</p>
          )}
        </div>
        <div>
          <label>
            Пароль
            <input type="password" onChange={(evt) => setPassword(evt.target.value)} />
          </label>
          {errorPassword && (
            <p className='errorText'>{errorPassword}</p>
          )}
        </div>
        <div>
          <label>
            Повторите пароль
            <input type="password" onChange={(evt) => setPasswordConfirm(evt.target.value)} />
          </label>
          {errorPasswordConfirm && (
            <p className='errorText'>{errorPasswordConfirm}</p>
          )}
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
