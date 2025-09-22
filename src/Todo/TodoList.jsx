import "./TodoList.css";
import { Link } from "react-router-dom";

function TodoList(props) {
  const { list, setDoneTodo, deleteTodo } = props;

  return (
    <section>
      <h1>Дела</h1>
      <table>
        <tbody>
          {list.map((item) => (
            <tr key={item.key}>
              <td>
                <Link to={`todo/${item.key}`}>
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
