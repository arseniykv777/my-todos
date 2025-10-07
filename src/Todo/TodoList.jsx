import { useState } from "react";
import "./TodoList.css";
import {Link, useLoaderData} from "react-router-dom";

function TodoList() {
  const list = useLoaderData()
  if (!list) return null;
  const [activeSortBtnIndex, setActiveSortBtnIndex] = useState(0);
  const [activeStateBtnIndex, setActiveStateBtnIndex] = useState(0);
  const [activeImportantBtnIndex, setActiveImportantBtnIndex] = useState(0);

  const handleActiveSortBtnIndex = (index) => {
    setActiveSortBtnIndex(index);
  };

  const handleStateBtn = (index) => {
    setActiveStateBtnIndex(index);
  };

  const handleImportantBtn = (index) => {
    setActiveImportantBtnIndex(index);
  };

  return (
    <section>
      <h1>Дела</h1>

      <div className="buttons-sort">
        {["По состоянию", "По важности"].map((text, i) => (
          <button
            key={i}
            className={activeSortBtnIndex === i ? "ActiveBtn" : ""}
            onClick={() => {
              handleActiveSortBtnIndex(i);
            }}
          >
            {text}
          </button>
        ))}
      </div>

      {activeSortBtnIndex === 0 && (
        <div className="buttons-sort">
          {["Все", "Выполненные", "Невыполненные"].map((text, i) => (
            <button
              key={i}
              className={activeStateBtnIndex === i ? "ActiveBtn" : ""}
              onClick={() => handleStateBtn(i)}
              autoFocus={activeStateBtnIndex === i}
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {activeSortBtnIndex === 1 && (
        <div className="buttons-sort">
          {["Все", "Низкие", "Средние", "Высокие"].map((text, i) => (
            <button
              key={i}
              className={activeImportantBtnIndex === i ? "ActiveBtn" : ""}
              onClick={() => handleImportantBtn(i)}
              autoFocus={activeImportantBtnIndex === i}
            >
              {text}
            </button>
          ))}
        </div>
      )}
      <table>
        <tbody>
          {list
            .filter((item) => {
              if (activeSortBtnIndex === 0) {
                if (activeStateBtnIndex === 0) return true;
                else if (activeStateBtnIndex === 1) {
                  return item.done;
                } else if (activeStateBtnIndex === 2) return !item.done;
              } else if (activeSortBtnIndex === 1) {
                if (activeImportantBtnIndex === 0) return true;
                for (let t = 1; t <= 3; t++) {
                  if (activeImportantBtnIndex === t) return item.important.index === t;
                }
              }
            })
            .map((item) => (
              <tr key={item.key}>
                <td>
                  <Link to={`/${item.key}`}>
                    {item.done && <del>{item.title}</del>}
                    {!item.done && item.title}
                  </Link>
                </td>
                <td>
                  <button disabled={item.done} className="done">
                    &#9745;
                  </button>
                </td>
                <td>
                  <button className="delete">
                    &#9746;
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default TodoList;
