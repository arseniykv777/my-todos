import { useEffect, useState } from "react";
import "./TodoList.css";
import { Link } from "react-router-dom";

function TodoList(props) {
  const { list, setDoneTodo, deleteTodo } = props;
  const [activeBtnIndex, setActiveBtnIndex] = useState(0);

  const handleSortBtn = (index) => {
    setActiveBtnIndex(index);
  };
  // const setActiveSortBtn = (evt) => {
  //   const sortBtn = document.querySelector(".ActiveSortBtn");
  //   sortBtn.classList.remove("ActiveSortBtn");
  //   evt.target.className = "ActiveSortBtn";
  // };
  return (
    <section>
      <h1>Дела</h1>

      <div className="button-sort">
        {["Все", "Выполненные", "Невыполненные"].map((text, i) => (
          <button
            key={i}
            className={activeBtnIndex === i ? "ActiveSortBtn" : ""}
            onClick={() => handleSortBtn(i)}
            autoFocus={i === 0}
          >
            {text}
          </button>
        ))}
      </div>
      <table>
        <tbody>
          {list
            .filter((item) => {
              if (activeBtnIndex === 0) return true;
              else if (activeBtnIndex === 1) return item.done;
              else if (activeBtnIndex === 2) return !item.done;
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
                  <button disabled={item.done} onClick={() => setDoneTodo(item.key)} className="done">
                    &#9745;
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteTodo(item.key)} className="delete">
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
