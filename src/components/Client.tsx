import React from "react";
import Avatar from "react-avatar";

const Client = ({ username, isMe }: IClient) => {
  const showName = (myname: string): string => {
    if (!!myname) {
      const actualName = myname.split("-")[0];
      if (actualName.length >= 15 && actualName.includes(" ")) {
        const nameArray = actualName.split(" ");
        return (
          myname.split(" ")[0][0].toUpperCase() +
          ". " +
          nameArray[1].split("-")[0].charAt(0).toUpperCase() +
          nameArray[1].split("-")[0].slice(1)
        );
      } else if (actualName.length >= 15) {
        return actualName.slice(0, 10) + "...";
      }
      return actualName;
    }
    return myname;
  };
  return (
    <div className="flex flex-col  items-center justify-center w-full my-4">
      <Avatar name={username} size="3rem" round={true} />
      <p className="w-full mt-1 text-[#334155] text-center">
        {isMe ? "You" : showName(username)}
      </p>
    </div>
  );
};
interface IClient {
  username: string;
  isMe: boolean;
}
export default Client;
