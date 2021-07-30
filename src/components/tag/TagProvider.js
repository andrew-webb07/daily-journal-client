import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = props => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    return fetch("http://localhost:8088/tags")
      .then(res => res.json())
      .then(setTags);
  };
  return (
    <TagContext.Provider
      value={{
        tags,
        getTags
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
