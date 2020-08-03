import React from "react";

const Book = ({ title, link, category, image }) => {

  if(!image || image === "N/A"){
    return null;
  }

  return (
    <div className="book-card">
      <div className="left">
        <img src={image} />
      </div>

      <div className="right">
        <a href={link} target="_blank">
          <h1>{title}</h1>
        </a>
        <p>Cateogry: {category}</p>
      </div>
    </div>
  );
};

export default Book;
