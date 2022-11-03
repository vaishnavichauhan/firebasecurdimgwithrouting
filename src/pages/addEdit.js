import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import './addEdit.css';
import {db} from "../firebase";
import {addDoc,collection,doc,getDoc,serverTimestamp,updateDoc} from "@firebase/firestore";
import {toast} from "react-toastify";
import {storage} from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const initalState = {
  name: "",
  email: "",
  contact: "",
}


function AddEdit() {
  const navigate = useNavigate();
  const [state, setstate] = useState(initalState);
  const [file,setfile]=useState(null);
  const { name, email, contact} = state;

  const{id}=useParams()
  
  // update 
  useEffect(() => {
    id && getsingleuserfun();
    console.log(id);
  }, [id]);

  //for update 
  const getsingleuserfun = async()=>{
    const docRef = doc(db,"userss", id);
    const snapshot = await getDoc(docRef); 
    if(snapshot.exists()){
      console.log("hello");
      setstate({...snapshot.data()})
    }
  }
  //forimage
  useEffect(() => {
    const uploadFile =()=>{
      const name = file.name;
      const storageRef = ref(storage,file.name);
      const uploadTask =uploadBytesResumable(storageRef,file);
      uploadTask.on("state_changed",(snapshot)=>{
        switch(snapshot.state){
          case "paused":
            console.log("upload is pause");
            break;
          case "running":
            console.log("upload is pause");
            break;
            default:
              break;
        }
      },(error) => {
        console.log(error);
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          console.log(downloadURL);
          // setstate((prev) =>({...prev, img:"nkcj"}))
          setstate({...state,img:downloadURL})
        })
      }
      );
   
    }
    file && uploadFile()
  }, [file])
  

  const handleInputchange = (e) => {
    const {name,value}= e.target;
    setstate({...state,[name]:value})
   };


  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(state);
    if(!name || !email || !contact){
      toast.error("please provide value")
    }else if(!id){
      await addDoc(collection(db,"userss"),{
        ...state,
      })
      toast.success("contact added succesfully")
    }else{
      await updateDoc(doc(db,"userss",id),{
        ...state,
      })
      toast.success(" update  succesfully")
    }
    
    setTimeout(()=>navigate("/"),500)
   };


  return (
    <div style={{ marginTop: "100px" }}>
      <h2>{id ? "Update old user info" : "Add new user info"}</h2>
      <form style={{ margin: "auto", padding: "15px", maxwidth: "400px", alignContent: "center" }}
      onSubmit={handleSubmit} >
        <label htmlFor='name'>Name</label>
        <input type="text" id="name" name="name" placeholder='enter name' value={name} onChange={handleInputchange} />

        <label htmlFor='email'>email</label>
        <input type="email" id="email" name="email" placeholder='enter email' value={email} onChange={handleInputchange} />

        <label htmlFor='contact' >Contact</label>
        <input type="number" id="contact" name="contact" placeholder='enter number' value={contact} onChange={handleInputchange} />

        <label htmlFor='contact' >upload</label>
        <input type="file" id="file" name="file" onChange={(e)=>setfile(e.target.files[0])} />
        <input type="submit" value="save"  />
      </form>
    </div>
  )
}

export default AddEdit