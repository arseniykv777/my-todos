import { useState } from "react";
import "./TodoAdd.css";
import {useSubmit} from "react-router-dom";

function TodoAdd() {
  const [activeIndexBtn, setActiveIndexBtn] = useState({ text: "Не выбрано", index: 0 });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const submit = useSubmit();

  const handleIndexBtn = (textBtn, i) => {
    setActiveIndexBtn({ text: textBtn, index: i });
  };

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

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const date = new Date();
    const createdAt = date.toLocaleString();
    const text = activeIndexBtn.text;
    const index = activeIndexBtn.index;
    submit({title, desc, image, createdAt, text, index}, {action: '/add', method: 'POST'});
  }

  return (
    <section>
      <h1>Создание нового дела</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <label>
          Заголовок<span className="secondary-text">(обязательно)</span>
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Примечание<span className="secondary-text bigSecondary">(необязательно)</span>
          <textarea value={desc} onChange={handleDescChange}></textarea>
        </label>

        <div className="important">
          <p>Важность</p>
          <div className="important__buttons">
            {["Не выбрано", "Низкая", "Средняя", "Высокая"].map((text, i) => (
              <button
                key={i}
                className={activeIndexBtn.index === i ? "ActiveBtn" : ``}
                autoFocus={i === 0}
                type="button"
                onClick={() => handleIndexBtn(text, i)}
              >
                {text}
              </button>
            ))}
            {/* <button autoFocus type="button">
              Не выбрано
            </button>
            <button type="button">Низкая</button>
            <button type="button">Средняя</button>
            <button type="button">Высокая</button> */}
          </div>
        </div>
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
