import React, { useEffect, useRef, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDoubleArrow } from "react-icons/md";
import Client from "../../components/Client";
import MyEditor from "./MyEditor";
import EditorSideBar from "./EditorSideBar";
import { v4 as uuidV4 } from "uuid";
import LangSelect from "./LangSelect";
import { ILangOption, ITheme } from "../../interfaces/Ilang.interface";
import { initSocket } from "../../utils/initSocket";
import { SOCKET_ACTIONS } from "../../utils/socketAction";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import { IClients } from "../../interfaces/socket.interface";

var socketRef: any;
const EditorsPage = () => {
  const myFlagRef = useRef<boolean>(false);

  const { roomId, userName } = useParams();
  const [clientsData, setClientsData] = useState<IClients[]>([]);
  const uniqueId = uuidV4();
  const uniqueUserName = `${userName}-${uniqueId}`;

  const location = useLocation();
  const navigate = useNavigate();
  const [showSlides, setShowSlides] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [myLang, setMyLang] = useState<ILangOption>({
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
  });
  const [myTheme, setMyTheme] = useState<ITheme>({
    label: "",
    value: "",
  });
  const [myCode, setMyCode] = useState<string>("");
  useEffect(() => {
    const showMobile = () => {
      setIsMobileView(window.innerWidth <= 765);
    };
    showMobile();
    window.addEventListener("resize", showMobile);
    return () => {
      window.removeEventListener("resize", showMobile);
    };
  }, [window.innerWidth]);
  useEffect(() => {
    const hadleErrors = (err: any) => {
      console.log("connection failed : ", err);
      toast.error("connection failed try again later");
      navigate("/");
    };
    const setSocket = async () => {
      socketRef = await initSocket();
      socketRef.emit(SOCKET_ACTIONS.CLIENT_UP, {
        message: `client is up roomId:${roomId} `,
      });
      socketRef.on(
        SOCKET_ACTIONS.SERVER_UP,
        ({ message }: { message: string }) => {
          console.log("socket_message : ", message);
        }
      );
      socketRef.emit(SOCKET_ACTIONS.JOIN, {
        roomId,
        userName: uniqueUserName,
      });
      socketRef.on("connection_failed", (err: any) => hadleErrors(err));
      socketRef.on(
        SOCKET_ACTIONS.JOINED,
        ({
          _userName,
          clients,
          socketId,
        }: {
          _userName: string;
          clients: IClients[];
          socketId: string;
        }) => {
          console.log("username : ", uniqueUserName, _userName);
          if (uniqueUserName !== _userName) {
            toast.success(`${_userName.split("-")[0]} is joind the room`);
          }
          setClientsData(
            clients?.map((_client) => ({
              ..._client,
              isMe: uniqueUserName === _client.userName,
            }))
          );
          console.log("clients data : ", clients);
        }
      );
    };
    setSocket();
  }, []);
  // useEffect(() => {
  //   socketRef.on(
  //     SOCKET_ACTIONS.JOINED,
  //     ({
  //       userName,
  //       clients,
  //       socketId,
  //     }: {
  //       userName: string;
  //       clients: IClients[];
  //       socketId: string;
  //     }) => {
  //       setClientsData(clients);
  //       console.log("clients data : ", clients);
  //     }
  //   );
  // }, [clientsData]);

  if (!roomId || !userName) return <Navigate to="/" />;

  return (
    <div className="w-full h-full  min-h-screen min-w-screen flex  relative  ">
      <EditorSideBar
        isMobileView={isMobileView}
        showSlides={showSlides}
        clientsData={clientsData}
        uniqueUserName={uniqueUserName}
      />
      <div className="min-w-screen min-h-screen overflow-hidden w-full  md:ml-[16.6vw] ml-2 mt-16 md:mt-0 ">
        {isMobileView && (
          <div
            onClick={() => setShowSlides((prev) => !prev)}
            className={`duration-500 ease-in-out z-[600] fixed top-2 ${
              showSlides
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white "
            } rounded-full  ${
              showSlides ? "left-[10rem]" : "-left-4"
            } top-3  p-2 cursor-pointer ${
              showSlides ? "rotate-180" : "rotate-0"
            }  `}
          >
            <MdDoubleArrow size={20} />
          </div>
        )}
        <MyEditor
          myLang={myLang}
          setMyLang={setMyLang}
          myCode={myCode}
          setMyCode={setMyCode}
          myTheme={myTheme}
          setMyTheme={setMyTheme}
        />
      </div>
    </div>
  );
};

export default EditorsPage;
