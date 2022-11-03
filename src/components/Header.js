import React, { useEffect, useState } from 'react'
import {Link,useLocation} from "react-router-dom";
import "./Header.css"


function Header() {
    const [activeTab,setActiveTab] = useState("Home");
    const location =useLocation();

    useEffect(()=>{
        if(location.pathname === "/"){
            setActiveTab("Home")
        }else if (location.pathname === "/add"){
            setActiveTab("AddContact")
        }else if (location.pathname === "/about"){
            setActiveTab("About")
        }
    },[location]);
  return (
    <div className='header'>
        <p className='logo'>Contact App</p>
        <div className='header-right'>
<Link to="/">
    <p className={`${activeTab === "Home" ? "active": ""}`}
        onclick = {()=> setActiveTab("Home")}
    > Home</p>
</Link>
<Link to="/add">
    <p className={`${activeTab === "AddContact" ? "active": ""}`}
        onclick = {()=> setActiveTab("AddContact")}
    > Add contact</p>
</Link>

<Link to="/about">
    <p className={`${activeTab === "About" ? "active": ""}`}
        onclick = {()=> setActiveTab("About")}
    > About</p>
</Link>

        </div>


    </div>
 
  )
}

export default Header