import "../scss/image.scss";
export default function Image({ className = "", source, click = () => {}, varient = "" }) {
    return (
      <img
        src={source}
        className={`rounded ${className} ${varient}`}
        onClick={click}
      />
    );
  }
  