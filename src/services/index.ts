import axios from "axios";
import toast from "react-hot-toast";
import { ICompilerResult } from "../interfaces/compilerResult.interface";
const compileCodeService = async(code:string,langId:number,setResult:any)=>{
    try{
        let config = {
            headers: {
              "content-type":"application/json",
              "x-rapidapi-host":`${process.env.REACT_APP_COMPILER_HOST}`,
              "x-rapidapi-key":`${process.env.REACT_APP_COMPILER_API_KEY}`
            }
          }
          let payload = {
            LanguageChoice:langId,
            Program:code
          }
          if(!code) return;
        const {data}=await axios.post(`${process.env.REACT_APP_COMPILER_API_URL}`,payload,config);
        setResult(data as ICompilerResult)
    }catch(err:any){
        console.log("error occured : ",err);
        toast.error("sorry code not compiled try again ");
        return;

    }
    
}
export default compileCodeService