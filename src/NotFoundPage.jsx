import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h1>
        Такой страницы не существует. Возвращайтесь <Link to="/">домой</Link>
      </h1>
    </section>
  );
}

export default NotFoundPage;
