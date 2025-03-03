import Image from "./Image";

export default function DashboardNav({ click, source, title }) {
  return (
    <div
      onClick={click}
      className="flex border shadow p-2 m-2 cursor-pointer gap-2"
    >
      <Image source={source} />
      <p className="flex flex-col justify-center">{title}</p>
    </div>
  );
}
