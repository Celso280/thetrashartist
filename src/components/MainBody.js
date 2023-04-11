import React from "react";
import Categories from "./container/Categories";
import ArtList from "./container/sale_section/ArtList";
import TextContent from "./container/TextContent";

function MainBody() {
  return (
    <div className="bg-slate-200">
      <Categories />
      <ArtList />
      <TextContent />
    </div>
  );
}

export default MainBody;
