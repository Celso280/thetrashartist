import React from "react";
import NavBar from "./NavBar";
import Home from "./container/Home";
import TextContent from "./container/TextContent";

function MainBody() {
  return (
    <div>   
      <NavBar/>
      <Home/>
      <TextContent/>
    </div>
  );
}

export default MainBody;
