import { useNavigate } from "react-router-dom";
import profile from "../asserts/profile.png";
import Button from "../components/Button";
import { useContext } from "react";
import Image from "../components/Image";
import { AuthContext } from "../context/AuthContextProvider";
import { UserData } from "../data/userData";
import { PREVIOUS_PAGE } from "../constants/navigationConstants";

export default function Profile() {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const user = UserData.find((data) => data.id == userId);
  return (
    <div className="flex justify-center font-mono">
      <div className="flex flex-col items-center bg-gray-100 rounded shadow-md m-4 p-4 w-2/4">
        <Image source={profile} className="h-44 w-44 rounded-t" />
        <h2 className="text-lg font-semibold">User - Details</h2>
        {user && (
          <>
            <h2 className="text-lg">Name : {user.name}</h2>
            <p className="text-lg">Date of Birth : {user.dob}</p>
            <p className="text-lg">Gender : {user.gender}</p>
            <p className="text-lg">Contact : {user.contact}</p>
            <p className="text-lg">Email : {user.email}</p>
            <p className="text-lg">Location : {user.location}</p>
          </>
        )}
        <div className="flex justify-around w-full">
          <Button title="Edit Profile" />
          <Button title="Change Password" />
          <Button
            title="Exit"
            click={() => {
              navigate(PREVIOUS_PAGE);
            }}
          />
        </div>
      </div>
    </div>
  );
}
