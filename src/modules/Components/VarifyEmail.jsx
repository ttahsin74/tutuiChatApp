import React from "react";
import { Link } from "react-router-dom";

const VarifyEmail = () => {
  return (
    <section>
      <div className="text-center font-bold flex flex-col gap-5 p-4 items-center">
        <h1 className="text-[36px]">Please varify your email</h1>
        <p className="max-w-[740px]">
          Check you mail, We are send a varification email, If are you went to
          login please verify your mail. Then click go to log in page.
        </p>
        <div>
          <button className="text-white bg-[#e93131] px-5 py-3 rounded-lg">
            <Link to ="/login" >Go to log in page</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VarifyEmail;
