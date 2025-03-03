export default function ServiceContent(props) {
    const { title, subTitle, description } = props;
  
    return (
      <div className="flex flex-col items-center border rounded-lg shadow p-2">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-2xl">{subTitle}</p>
        <p className="text-2xl">{description}</p>
      </div>
    );
  }
  