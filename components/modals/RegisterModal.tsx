import axios from "axios";
import { useCallback, useState } from "react";
import {toast} from 'react-hot-toast';
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import Input from "../Input";
import Modal from "../Modal";
//import { signIn } from "next-auth/react";

//import Credentials from "next-auth/providers/credentials";

const RegisterModal = ()=>{
const loginModal = useLoginModal();
const registerModal = useRegisterModal();

const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [name,setName]= useState('');
const [username,setuserName]= useState('');
const [isLoading,setIsLoading]= useState(false);

const onToggle = useCallback(()=>{
    if(isLoading){
        return;
    }
    registerModal.onClose();
    loginModal.onOpen();

},[isLoading,registerModal,loginModal]);

const onSubmit = useCallback(async() => {
try{
setIsLoading(true);
//todo and log in
await axios.post('/api/register',{
    email,
    password,
    username,
    name
});
toast.success('Account created.');
signIn('credentials',{
    email,
    password
});

registerModal.onClose();

} catch(error){
    console.log(error);
    toast.error('Something went wrong');
}
finally{
    setIsLoading(false);
}

},[registerModal,email,password,username,name, ]);
 
const bodyContent= (
   <div className=" flex flex-col gap-4">
     <Input
     placeholder="Email"
     onChange={(e)=>setEmail(e.target.value)}
     value={email}
     disabled={isLoading}
     />
      <Input
     placeholder="Name"
     onChange={(e)=>setName(e.target.value)}
     value={name}
     disabled={isLoading}
     />
     <Input
     placeholder="UserName"
     onChange={(e)=>setuserName(e.target.value)}
     value={username}
     disabled={isLoading}
     />
      <Input
     placeholder="Password"
     type="password"
     onChange={(e)=>setPassword(e.target.value)}
     value={password}
     disabled={isLoading}
     />
   </div>
)
const footerContent =(
    <div className=" text-neutral-400 text-center mt-4">
        <p>Already have an account?
            <span 
            onClick={onToggle}
            className="text-white
            
            cursor-pointer
            hover:underline">
                Sign In
            </span>
        </p>
    </div>
)
    return(
       <Modal 
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Create An Account"
       actionlabel="Register"
       onClose={registerModal.onClose}
       onSubmit={onSubmit}
       body={bodyContent }
       footer= {footerContent}

       />
    );
}

export default RegisterModal;