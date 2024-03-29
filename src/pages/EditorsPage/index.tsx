import React, { useCallback, useEffect, useRef, useState } from "react";
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
import compileCodeService from "../../services";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import { IClients } from "../../interfaces/socket.interface";
import CompilerModal from "../../components/CompilerModal";
import { ICompilerResult } from "../../interfaces/compilerResult.interface";
import { stringify } from "querystring";
const EditorsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ICompilerResult>();
  const [myLang, setMyLang] = useState<ILangOption>({
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript",
    format: "js",
    compilerId: 17,
  });
  const [myTheme, setMyTheme] = useState<ITheme>({
    label: "",
    value: "",
  });
  const [myCode, setMyCode] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const socketRef = useRef<any>();
  const codeRef = useRef<any>();
  const langRef = useRef<ILangOption>(myLang);

  const { roomId, userName } = useParams();
  const params = useParams();
  const removeSocket = () => {
    socketRef.current.off(SOCKET_ACTIONS.JOINED);
    socketRef.current.disconnect();
  };
  const [clientsData, setClientsData] = useState<IClients[]>([]);
  const uniqueId = uuidV4();
  const uniqueUserName = `${userName}-${uniqueId}`;

  const location = useLocation();
  const navigate = useNavigate();
  const [showSlides, setShowSlides] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

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
        ({ message }: { message: string }) => {}
      );
      socketRef.current.emit(SOCKET_ACTIONS.JOIN, {
        roomId,
        userName: uniqueUserName,
      });
      socketRef.current.on(
        SOCKET_ACTIONS.DISCONNECTED,
        ({
          socketId,
          _userName,
          clientsData,
          userName,
        }: {
          socketId: string;
          _userName: string;
          userName: string;
          clientsData: IClients[];
        }) => {
          console.log("client data in disconnection ", _userName, userName);
          console.log("all connections : ", clientsData);
          const filterClients = clientsData
            .filter(
              (fSelf: { userName: string; socketId: string }) =>
                fSelf.userName !== _userName
            )
            .map((self: { userName: string; socketId: string }) => ({
              ...self,
              isMe: self.userName === uniqueUserName,
            }));
          setClientsData(filterClients);

          // const filterClients = clientsData.filter(
          //   (self: IClients) => self.socketId !== socketId
          // );

          // setClientsData(filterClients);
          toast.error(`${userName} is removed`);
        }
      );

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
          let flag: boolean = false;
          if (!flag) {
            if (uniqueUserName !== _userName) {
              socketRef.current.emit(SOCKET_ACTIONS.SYNC_CODE, {
                myCode: codeRef.current,
                _userName: uniqueUserName,
                roomId,
              });
              socketRef.current.emit(SOCKET_ACTIONS.LANG_CHANGING, {
                newLang: langRef.current,
                _userName: uniqueUserName,
                roomId,
              });
              toast.success(`${_userName.split("-")[0]} is joind the room`);
            }
            setClientsData(
              clients?.map((_client) => ({
                ..._client,
                isMe: uniqueUserName === _client.userName,
              }))
            );
            flag = true;
          }
        }
      );
      socketRef.current.on(
        SOCKET_ACTIONS.CODE_CHANGED,
        ({ myCode, _userName }: { myCode: string; _userName: string }) => {
          if (_userName !== uniqueUserName) {
            setMyCode(myCode);
            codeRef.current = myCode;
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
            console.log({ newLang });
            setMyLang(newLang);
            console.log("mylang :", myLang);
            langRef.current = newLang;
            console.log("lang ref : ", langRef);
          }
        }
      );
      socketRef.current.on(
        SOCKET_ACTIONS.COMPILING,
        async ({ _userName }: { _userName: string }) => {
          try {
            if (_userName !== uniqueUserName) {
              toast.success(`code compiling by ${_userName.split("-")[0]}`);
              await onCompiledCodes(false);
            }
          } catch (err: any) {
            toast.error(`something went wrong`);
            console.log(`error occured : `, err);
          }
        }
      );
      socketRef.current.on(
        SOCKET_ACTIONS.LEAVE,
        ({
          roomId,
          _userName,
          userName,
        }: {
          roomId: string;
          _userName: string;
          userName: string;
        }) => {
          console.log("leave on hit");
          if (uniqueUserName !== _userName) {
            console.log("leave on hit 2");
            setClientsData((prev: IClients[]) =>
              prev.filter((self) => self.userName !== uniqueUserName)
            );
          }
        }
      );
    };
    setSocket();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
      socketRef.current.emit(SOCKET_ACTIONS.LEAVE, {
        roomId: params.roomId,
        _userName: uniqueUserName,
        userName: userName,
      });
    });
  }, []);
  const saveCodeToRef = (myCode: string) => {
    codeRef.current = myCode;
  };

  const onChangeMyCode = async (value: string, cb: any) => {
    setMyCode(value);
    socketRef.current.emit(SOCKET_ACTIONS.SYNC_CODE, {
      myCode: value,
      _userName: uniqueUserName,
      roomId,
    });
    cb(myCode);
  };
  const onLangChange = (newLang: ILangOption) => {
    setMyLang(newLang);
    console.log("new lang on lang change : ", newLang);
    langRef.current = newLang;
    socketRef.current.emit(SOCKET_ACTIONS.LANG_CHANGING, {
      newLang,
      _userName: uniqueUserName,
      roomId,
    });
  };
  // copy the room id and then changed
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(
        `${
          uniqueUserName.split("-")[0]
        } is invited you to join MS Editor Code room click this link : ${
          process.env.REACT_APP_CLIENT_URL
        }/${roomId}`
      );
      toast.success("room ID copied");
    } catch (err: any) {
      toast.error("room id not copied try again later");
    }
  };

  const onCompiledCodes = useCallback(
    async function CompiledCodes(isGuest: boolean) {
      setLoading(true);
      console.log("compile id : ", myLang);
      console.log("lang ref :", langRef);
      let myCodeData: string = myCode || codeRef.current;
      await compileCodeService(
        myCodeData,
        langRef.current.compilerId,
        setResult
      );
      setLoading(false);
      setOpenModal(true);
      if (isGuest) {
        socketRef.current.emit(SOCKET_ACTIONS.COMPILE_REQ, {
          roomId,
          _userName: uniqueUserName,
        });
      }
    },
    [uniqueUserName]
  );

  // useEffect(() => {
  //   window.addEventListener("beforeunload", (e) => {
  //     e.preventDefault();
  //     e.returnValue = "";
  //     const myData: IClients | undefined = clientsData.find(
  //       (self: IClients) => self.isMe === true
  //     );
  //     if (myData) {
  //
  //       socketRef.current.emit(
  //         "client_removed",
  //         JSON.stringify({ connectedScoketId: myData.socketId })
  //       );
  //     }
  // //   });
  // }, []);

  if (!roomId || !userName) return <Navigate to="/" />;

  return (
    <div className="w-full h-full  min-h-screen min-w-screen flex  relative  ">
      {!!result && (
        <CompilerModal open={openModal} setOpen={setOpenModal}>
          {!!result.Errors && (
            <div className="py-2 px-4 overflow-y-auto rounded-md bg-[rgba(255,0,0,0.3)] w-full my-2 text-red-700 flex flex-col justify-center items-center">
              <p className="text-2xl font-extrabold my-2">Error Occured</p>
              <p>
                <span className="mr-5 font-bold">Result : </span>{" "}
                {result.Errors}
              </p>
            </div>
          )}
          {!!result.Result && (
            <div className="py-2 px-4 overflow-y-auto rounded-md bg-[rgba(0,255,0,0.3)] w-full my-2 text-green-700 flex flex-col justify-center items-center">
              <p className="text-2xl font-extrabold my-2">
                Compiled Successfully
              </p>
              <p>
                <span className="mr-5 font-bold">Result : </span>{" "}
                {result.Result}
              </p>
            </div>
          )}
        </CompilerModal>
      )}

      <EditorSideBar
        isMobileView={isMobileView}
        showSlides={showSlides}
        clientsData={clientsData}
        uniqueUserName={uniqueUserName}
        removeMySocket={removeSocket}
        copyRoomId={copyRoomId}
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
          setMyCode={(value: string) => onChangeMyCode(value, saveCodeToRef)}
          myTheme={myTheme}
          setMyTheme={setMyTheme}
          compileFunc={onCompiledCodes}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default EditorsPage;
