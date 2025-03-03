export default function Input({ name, type, content, change = () => {} }) {
    return (
      <input
        className="primary-input"
        type={type}
        name={name}
        placeholder={content}
        onChange={change}
        required
      />
    );
  }
  