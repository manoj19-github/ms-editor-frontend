import React from "react";
import Avatar from "react-avatar";

const Client = ({ username }: IClient) => {
  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <Avatar name={username} size="3rem" round={true} />
      <p className="w-full mt-1 text-[#334155]">
        {username.length >= 17
          ? username.split(" ")[0][0] + username.split(" ")[1][0]
          : username}
      </p>
    </div>
  );
};
interface IClient {
  username: string;
}
export default Client;
