import "../scss/button.scss";

export default function Button({ title, click = () => {} }) {
  return (
    <button className="primary" onClick={click}>
      {title}
    </button>
  );
}
