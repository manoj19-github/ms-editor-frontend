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
import { stringify } from "querystring";

// var socketRef.current: any;
const EditorsPage = () => {
  const myFlagRef = useRef<boolean>(false);
  const socketRef = useRef<any>();

  const { roomId, userName } = useParams();
  const removeSocket = () => {
    socketRef.current.off(SOCKET_ACTIONS.JOINED);
    socketRef.current.off(SOCKET_ACTIONS.DISCONNECTED);
    socketRef.current.disconnect();
  };
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
      socketRef.current = await initSocket();
      socketRef.current.emit(SOCKET_ACTIONS.CLIENT_UP, {
        message: `client is up roomId:${roomId} `,
      });
      socketRef.current.on(
        SOCKET_ACTIONS.SERVER_UP,
        ({ message }: { message: string }) => {
          console.log("socket_message : ", message);
        }
      );
      socketRef.current.emit(SOCKET_ACTIONS.JOIN, {
        roomId,
        userName: uniqueUserName,
      });
      socketRef.current.on("connection_failed", (err: any) => hadleErrors(err));
      socketRef.current.on(
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
      socketRef.current.on(
        SOCKET_ACTIONS.CODE_CHANGED,
        ({ myCode, _userName }: { myCode: string; _userName: string }) => {
          if (_userName !== uniqueUserName) {
            setMyCode(myCode);
            console.log("my code sync : ", myCode);
          }
        }
      );
      socketRef.current.on(
        SOCKET_ACTIONS.LANG_CHANGED,
        ({
          newLang,
          _userName,
        }: {
          newLang: ILangOption;
          _userName: string;
        }) => {
          if (_userName !== uniqueUserName) {
            toast.success(`Language changed by ${_userName.split("-")[0]}`);
            setMyLang(newLang);
          }
        }
      );
      socketRef.current.on(
        SOCKET_ACTIONS.DISCONNECTED,
        ({ socketId, _userName }: { socketId: string; _userName: string }) => {
          toast.success(`${_userName.split("-")[0]} left the room`);
          setClientsData((prev: IClients[]) => {
            return prev.filter(
              (_client: IClients) => _client.socketId !== socketId
            );
          });
        }
      );
    };
    setSocket();
  }, []);
  const onChangeMyCode = async (value: string) => {
    setMyCode(value);
    socketRef.current.emit(SOCKET_ACTIONS.SYNC_CODE, {
      myCode: value,
      _userName: uniqueUserName,
      roomId,
    });
  };
  const onLangChange = (newLang: ILangOption) => {
    setMyLang(newLang);
    socketRef.current.emit(SOCKET_ACTIONS.LANG_CHANGING, {
      newLang,
      _userName: uniqueUserName,
      roomId,
    });
  };
  //  useEffect(()=>{
  //   return ()=>removeSocket();
  //  },[])

  if (!roomId || !userName) return <Navigate to="/" />;

  return (
    <div className="w-full h-full  min-h-screen min-w-screen flex  relative  ">
      <EditorSideBar
        isMobileView={isMobileView}
        showSlides={showSlides}
        clientsData={clientsData}
        uniqueUserName={uniqueUserName}
        removeMySocket={removeSocket}
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
          setMyLang={onLangChange}
          myCode={myCode}
          setMyCode={onChangeMyCode}
          myTheme={myTheme}
          setMyTheme={setMyTheme}
        />
      </div>
    </div>
  );
};

export default EditorsPage;
