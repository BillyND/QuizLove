import {
  DashOutlined,
  FolderOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Skeleton } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import { windowWidth } from "../../utils/constant";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import { useDebounce } from "../../utils/useDebounce";
import "./DetailFolder.scss";
import { debounce } from "lodash";

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

export const ModalAddCourse = () => {
  const {
    state: { MODAL_ADD_COURSE },
    state,
    setState,
  } = useSubscription(modalSubscription, ["MODAL_ADD_COURSE"]);

  const handleCloseModal = () => {
    setState({
      ...state,
      MODAL_ADD_COURSE: false,
    });
  };

  const handleOk = () => {};

  return (
    <Modal
      title={
        <h1
          style={{
            backgroundColor: "#4255ff",
            position: "absolute",
            insetInline: "0",
            insetBlockStart: "0",
            padding: "32px",
            fontSize: "30px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Thêm học phần
        </h1>
      }
      open={MODAL_ADD_COURSE}
      onOk={handleOk}
      onCancel={handleCloseModal}
    >
      <div style={{ paddingBlockStart: "90px" }}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>
    </Modal>
  );
};

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

const EmptyDetailFolder = () => {
  return (
    <div className="container-empty-folder d-grid align-items-center w-100 gap-2">
      <div className="header mx-auto">Thư mục này chưa có học phần</div>
      <div className="description mx-auto">
        Sắp xếp mọi học phần của bạn theo thư mục.
      </div>
      <Button className="button-add-course" onClick={handleOpenModalAddCourse}>
        Thêm học phần
      </Button>
    </div>
  );
};

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
      <ModalAddCourse />
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
