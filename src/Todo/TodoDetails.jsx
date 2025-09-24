import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

function TodoDetails({ getDeed }) {
  const { key } = useParams();
  const deed = getDeed(Number(key));

  if (!deed) {
    return <NotFoundPage />;
  }

  return (
    <section>
      {deed.done && <p className="success">Выполнено</p>}
      <h1>{deed.title}</h1>
      <p>{deed.createdAt}</p>
      {deed.desc && <p>{deed.desc}</p>}
      {deed.image && (
        <p>
          <img src={deed.image} alt="Иллюстрация" style={{ maxWidth: "500px", maxHeight: "400px" }} />
        </p>
      )}
    </section>
  );
}

export default TodoDetails;
