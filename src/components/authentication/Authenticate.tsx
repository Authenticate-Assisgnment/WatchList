import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyDispatch } from "../../main";
import { login, signup } from "../../services/auth";

type PropType = {
  setAuthenticationType: Dispatch<SetStateAction<string>>;
  text: string;
};

const Authenticate = ({ setAuthenticationType, text }: PropType) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const dispatch = useMyDispatch();

  const submit = (e: any) => {
    e.preventDefault();
    if (text === "Login") {
      dispatch(login(email, navigate));
    } else {
      signup(email, navigate,setEmail);
    }
  };

  return (
    <form className="auth-form bg-gray-300 p-4 rounded-md border border-gray-500">
      <h2 className="font-semibold text-2xl mb-4">{text}</h2>
      <label className="flex flex-col gap-2 mb-4">
        <span>Email Address</span>
        <input
          className="p-2 rounded-md outline-none border border-gray-500"
          type="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <button className="bg-blue-400 px-4 py-2 rounded-md text-white" onClick={submit}>
        {text}
      </button>
      <p className="mt-4">
        {text === "Login" ? "New User?" : "Already Registered?"}{" "}
        <span
          onClick={() => setAuthenticationType(text === "Login" ? "Signup" : "Login")}
          className="text-red-600 cursor-pointer"
        >
          {text === "Login" ? "Signup" : "Login"}
        </span>
      </p>
    </form>
  );
};

export default Authenticate;
