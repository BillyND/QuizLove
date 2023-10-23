import {
  DashOutlined,
  FolderOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import { windowWidth } from "../../utils/constant";
import { useDebounce } from "../../utils/useDebounce";
import { listRecent } from "../Home/HomeLogged";
import "./DetailFolder.scss";

const SkeletonDetailFolder = () => {
  return (
    <div className="container pt-5 d-grid">
      <div className="d-flex gap-3">
        <SkeletonInput active /> <SkeletonInput active />
      </div>
      <SkeletonInput active className="pt-4" />
      <Skeleton active className="pt-5" />
      <Skeleton active className="pt-5" />
    </div>
  );
};

function DetailFolder(props) {
  const params = useParams();
  const folderId = params?.id;
  const emailAuthor = params?.email;
  const [folder, setFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const debounceParams = useDebounce(JSON.stringify(params), 100);

  const handleGetFolderByCondition = async () => {
    setIsLoading(true);
    setFolder(null);
    try {
      const resFolder = await getFolderByCondition({ folderId, emailAuthor });

      if (!resFolder?.data?.[0] && params?.email) {
        navigate(`/${params?.email}`);
      }
      setFolder(resFolder?.data?.[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (params?.email) {
        navigate(`/${params?.email}`);
      }
    }
  };

  const handleMoveToUser = () => {
    navigate(`/${folder?.author?.email}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleGetFolderByCondition();
  }, [debounceParams]);

  if (isLoading) {
    return <SkeletonDetailFolder />;
  }

  return (
    <div className="container detail-folder-page none-copy">
      <div className="header-detail-page justify-content-between">
        <div className="header-detail-page">
          <span className="count-course">0 học phần</span>
          <div className="author" onClick={handleMoveToUser}>
            <div className="creator">tạo bởi</div>
            <div
              className="thumbnail"
              style={{ backgroundImage: `url(${folder?.author?.avatar})` }}
            ></div>
            <div className="name">{folder?.author?.username}</div>
          </div>
        </div>
        <div className="group-icon-detail-folder d-flex gap-3">
          <PlusOutlined className="icon" />
          <UploadOutlined className="icon" />
          <DashOutlined className="icon" />
        </div>
      </div>
      <span className="title-detail-page mt-3">
        <FolderOutlined className="icon-title-detail-page" />
        <span className="name-folder">{folder?.name}</span>
      </span>
      <div className="description ms-1">{folder?.description}</div>

      <div className="content-detail-page pt-5">
        <div className="list-recent hidden-scrollbar">
          {listRecent?.map((item, index) => {
            if (windowWidth < 600 && index > 1) return;
            return (
              <div
                key={item?.name + index}
                className="item shadow-card cursor-pointer"
              >
                <header>
                  <span className="title">{item?.title}</span>
                  <div className="assembly">{item?.assembly}</div>
                </header>

                <footer>
                  <div
                    className="thumbnail"
                    style={{
                      backgroundImage: `url('${item?.thumbnail}')`,
                    }}
                  ></div>

                  <span>{item?.name}</span>

                  <div className="assembly">{item?.role}</div>
                </footer>
                <span className="line-footer transition-02"></span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailFolder;
