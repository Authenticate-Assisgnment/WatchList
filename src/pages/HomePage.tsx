import { useState } from "react";
import Authenticate from "../components/authentication/Authenticate";

const HomePage = () => {
  const [authenticationType, setAuthenticationType] = useState<string>("Login");
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center flex-col gap-[100px]">
      <h2 className="font-bold md:text-5xl text-3xl">Welcome To WatchList</h2>
      {authenticationType === "Login" ? (
        <Authenticate
          setAuthenticationType={setAuthenticationType}
          text="Login"
        />
      ) : (
        <Authenticate
          setAuthenticationType={setAuthenticationType}
          text="Signup"
        />
      )}
    </div>
  );
};

export default HomePage;
