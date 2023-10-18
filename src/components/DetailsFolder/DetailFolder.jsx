import { FolderOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import { useDebounce } from "../../utils/useDebounce";
import "./DetailFolder.scss";

function DetailFolder(props) {
  const params = useParams();
  const folderId = params?.id;
  const [folder, setFolder] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const debounceParams = useDebounce(JSON.stringify(params), 100);

  const handleGetFolderByCondition = async () => {
    setIsLoading(true);
    try {
      const resFolder = await getFolderByCondition({ folderId });

      setFolder(resFolder?.data?.[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetFolderByCondition();
  }, [debounceParams]);

  return (
    <div className="container detail-folder-page">
      <div className="header-detail-page">
        <span className="count-course">0 học phần</span>

        <div className="author">
          <div className="creator">Tạo bởi</div>
          <div className="thumbnail"></div>
          <div className="name">name</div>
        </div>
      </div>
      <span className="title-detail-page">
        <FolderOutlined className="icon-title-detail-page" />
        <span className="name-folder">{folder?.name}</span>
      </span>
    </div>
  );
}

export default DetailFolder;
