import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

function TodoDetails({ getDeed, data }) {
  const { key } = useParams();
  const navigate = useNavigate();
  const deed = getDeed(key);

  if (!deed) {
    return <NotFoundPage />;
  }

  const goBack = () => navigate(-1);

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
      <button onClick={goBack}>Назад</button>
    </section>
  );
}

export default TodoDetails;
