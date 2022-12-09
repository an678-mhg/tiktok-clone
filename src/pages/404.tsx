import React from "react";
import Error from "../components/Error";
import Meta from "../components/Meta";

const PageNotFound = () => {
  return (
    <div>
      <Meta
        title="Page not found | 404"
        description="Page not found | 404"
        image="https://res.cloudinary.com/dhz1uowbg/image/upload/v1670595740/uioexfuepgqqovjzfskk.png"
      />
      <Error />
    </div>
  );
};

export default PageNotFound;
