import React from "react";
import { cn } from "../lib/utils";
import { buttonVariants } from "./ui/button";

function Sidebar({ items, setRender, render }) {

  const handleClick = (itemName) => {
    setRender(itemName);
  };

  return (
    <nav className={cn("flex space-x-1 lg:flex-col lg:space-x-0 lg:space-y-1 justify-center ")}>
      {items.map((item) => (
        <button
          key={item.title}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            render === item.title ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
          onClick={() => handleClick(item.title)}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}

export default Sidebar;
