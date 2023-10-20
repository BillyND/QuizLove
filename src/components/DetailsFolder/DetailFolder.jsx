import { FolderOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import { useDebounce } from "../../utils/useDebounce";
import "./DetailFolder.scss";
import { Alert, Spin } from "antd";
import { windowWidth } from "../../utils/constant";
import { listRecent } from "../Home/HomeLogged";

function DetailFolder(props) {
  const params = useParams();
  const folderId = params?.id;
  const [folder, setFolder] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const debounceParams = useDebounce(JSON.stringify(params), 100);

  const handleGetFolderByCondition = async () => {
    setIsLoading(true);
    setFolder(null);
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
    window.scrollTo(0, 0);
    handleGetFolderByCondition();
  }, [debounceParams]);

  if (isLoading) {
    return (
      <Spin size="large">
        <Alert
          message=""
          description=""
          style={{ height: "100vh", backgroundColor: "transparent" }}
        />
      </Spin>
    );
  }

  return (
    <div className="container detail-folder-page ">
      <div className="header-detail-page">
        <span className="count-course">0 học phần</span>

        <div className="author">
          <div className="creator">Tạo bởi</div>
          <div className="thumbnail"></div>
          <div className="name">name</div>
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
