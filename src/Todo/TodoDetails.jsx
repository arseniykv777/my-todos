import {useLoaderData, useNavigate} from "react-router-dom";

function TodoDetails() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const deed = useLoaderData();

  return (
    <section>
      {deed.done && <p className="success">Выполнено</p>}
      <h1>{deed.title}</h1>
      <p>Важность: {deed.important.text}</p>
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
