import { useShowEditProfileStore } from "@/store/useShowEditProfileStore";
import React from "react";
import EditLayout from "./EditLayout";
import AboutClient from "./AboutClient";

interface Props{
  userId: number;
}
const EditProfile = ({ userId }: Props) => {
 
  return (
    
    
        <EditLayout userId={userId}/>
       
       
        
    
  );
};

export default EditProfile;
