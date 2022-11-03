import React, { useEffect, useState } from 'react';
import {collection,onSnapshot,deleteDoc,doc}from "firebase/firestore";
import {db} from "../firebase";
import {useNavigate} from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const[users,setuser]=useState([]);

  useEffect(()=>{
    const getdatas = onSnapshot(collection(db,"userss"),
    (snapshot)=> {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({id:doc.id,...doc.data()})
      });
      setuser(list)

    })
  },[])
  
 const handeleDelete =async(id)=>{

if(window.confirm("Are you sure delete user")){
  try {
    await deleteDoc(doc(db,"userss",id));
    setuser(users.filter((i)=>i.id !== id));
  } catch (error) {
    console.log(error);
  }

}
  }
  
  return (
    <div>
<h1>home....</h1>
{
  users.map((i)=>{
    return <div style={{borderWidth:1,borderStyle:"double",marginBottom:"10px"}}>
      <div>{i.name}</div>
      <div>{i.email}</div>
      <div>{i.contact}</div>
      <img src={i.img} style={{height:100,width:100}}/>
      <div>
        <button onClick={()=>navigate(`/update/${i.id}`)}>update</button>
        <button onClick={()=>handeleDelete(i.id)}>delete</button>
      </div>
    </div>
  })
}
    </div>
  )
}

export default Home