import {
  DashOutlined,
  FolderOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import { windowWidth } from "../../utils/constant";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import { useDebounce } from "../../utils/useDebounce";
import EmptyDetailFolder from "../EmptyComponent/EmptyDetailFolder";
import SkeletonDetailFolder from "../Skeleton/SkeletonDetailFolder";
import "./DetailFolder.scss";
import ModalAddCourseDetailFolder from "./ModalAddCourseDetailFolder";

export const detailFolderSubscription = createSubscription({
  listCourse: [],
});

export const modalSubscription = createSubscription({});

export const handleOpenModalAddCourse = debounce(() => {
  modalSubscription.updateState({
    ...modalSubscription?.state,
    MODAL_ADD_COURSE: true,
  });
}, 100);

const ContentDetailFolder = () => {
  const {
    state: { listCourse },
  } = useSubscription(detailFolderSubscription);

  if (!listCourse?.length) return <EmptyDetailFolder />;

  return (
    <>
      {listCourse?.map((item, index) => {
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
    </>
  );
};

const HeaderControl = () => {
  return (
    <div className="group-icon-detail-folder d-flex gap-3">
      <PlusOutlined className="icon" onClick={handleOpenModalAddCourse} />
      <UploadOutlined className="icon" />
      <DashOutlined className="icon" />
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
      <ModalAddCourseDetailFolder />
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

        <HeaderControl />
      </div>
      <span className="title-detail-page mt-3">
        <FolderOutlined className="icon-title-detail-page" />
        <span className="name-folder">{folder?.name}</span>
      </span>
      <div className="description ms-1">{folder?.description}</div>

      <div className="content-detail-page pt-5">
        <div className="list-recent hidden-scrollbar">
          <ContentDetailFolder />
        </div>
      </div>
    </div>
  );
}

export default DetailFolder;
