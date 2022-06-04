import React from "react";
import { db } from "../../firebase";
export const Docs = ({db}) => {
  return (
    <div className="docs-main">
          <h1>Docs Clone</h1>
          <button className="add-listing">
              Add Listing
          </button>
    </div>
  );
};

export default Docs;