import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./TodoAdd.css";
import { add } from "../Auth/api";
import { useEffect } from "react";

function TodoAdd(props) {
  const { addTodo, currentUser } = props;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setRedirect(true);
    }
  }, [currentUser]);

  const handleTitleChange = (evt) => setTitle(evt.target.value);
  const handleDescChange = (evt) => setDesc(evt.target.value);

  const handleImageChange = (evt) => {
    const cFiles = evt.target.files;
    if (cFiles.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => setImage(fileReader.result);
      fileReader.readAsDataURL(cFiles[0]);
    } else {
      setImage("");
    }
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const date = new Date();

    const deed = {
      title,
      desc,
      image,
      done: false,
      createdAt: date.toLocaleString(),
      key: date.getTime(),
    };
    const addedDeed = await add(currentUser, deed);
    addTodo(addedDeed);
    setRedirect(true);
  };

  console.log(currentUser);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <h1>Создание нового дела</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <label>
          Заголовок
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Примечание
          <textarea value={desc} onChange={handleDescChange}></textarea>
        </label>

        <footer className="form__footer">
          <label className="file-input__label">
            <input type="file" className="file-input" onChange={handleImageChange} />
            Графическая иллюстрация...
          </label>

          <div className="form__buttons">
            <button type="reset">Сброс</button>
            <button type="submit">Создать новое дело</button>
          </div>
        </footer>
      </form>
    </section>
  );
}

export default TodoAdd;
