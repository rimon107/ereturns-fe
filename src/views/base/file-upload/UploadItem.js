import React from "react";
import { CProgress } from "@coreui/react";

const UploadItem = (props) => {
  return <CProgress animated value={props.file.progress} className="mb-3" />;
};

export default UploadItem;
