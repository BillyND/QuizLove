import { CaretDownOutlined } from "@ant-design/icons";
import { Popover, Skeleton, Tabs } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCourseByCondition, getFolderByCondition } from "../../services/api";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import "./PopoverLibrary.scss";
import { infoUserSubs } from "./Header";

export const popoverLibSubscription = createSubscription({
  contentLib: [],
  loading: false,
  visible: false,
  type: null,
});

const TabContent = () => {
  const {
    state: { type },
    setState,
  } = useSubscription(popoverLibSubscription);

  const handleFetchContent = async (key) => {
    setState({ loading: true });
    setState({ contentLib: [] });
    try {
      if (key === "classes") {
        setState({ contentLib: [], type: key });
      }
      if (key === "courses") {
        const resFolder = await getCourseByCondition({
          limit: 20,
        });
        setState({ contentLib: resFolder?.data, type: key });
      }
      if (key === "folders") {
        const resFolder = await getFolderByCondition({
          limit: 20,
        });
        setState({ contentLib: resFolder?.data, type: key });
      }
      if (key === "answers") {
        setState({ contentLib: [] });
      }
      setState({ loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };
  const items = [
    {
      key: "classes",

      label: "Lớp học",
    },
    {
      key: "courses",
      label: "Học phần",
    },
    {
      key: "folders",
      label: "Thư mục",
    },
    {
      key: "answers",
      label: "Lời giải chuyên gia",
    },
  ];
  return (
    <Tabs className="pt-3 px-3" items={items} onChange={handleFetchContent} />
  );
};

const ContainerContent = (props) => {
  const { togglePopover } = props;

  const {
    state: { contentLib, loading, type },
  } = useSubscription(popoverLibSubscription, ["contentLib", "loading"]);
  const navigate = useNavigate();

  const handleSelectFolder = (item) => {
    navigate(`/${infoUserSubs?.state?.email}/${type}/${item?._id}`);
    togglePopover();
  };

  return (
    <div className="container-content-lib hidden-scrollbar">
      <Skeleton className="p-3" loading={loading} active />
      <>
        {contentLib?.map((item) => {
          return (
            <div
              key={item?._id}
              className="item"
              onClick={() => handleSelectFolder(item)}
            >
              <div className="content gap-1">
                <div className="title"> {item?.name || item?.title}</div>
                <div className="length-course">
                  {type === "courses" ? (
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        width={15}
                        height={15}
                        src={item?.author?.avatar}
                      ></img>
                      <div>{item?.author?.username}</div>
                    </div>
                  ) : type === "folders" ? (
                    `${item?.source?.length || 0} học phần`
                  ) : (
                    "other"
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </>
      <div className="footer">
        {/* <Divider /> */}
        Footer
      </div>
    </div>
  );
};

function PopoverLibrary() {
  const {
    state: { visible },
    state,
    setState,
  } = useSubscription(popoverLibSubscription, ["visible"]);

  const togglePopover = () => setState({ contentLib: [], visible: !visible });

  const activator = (
    <button
      onClick={togglePopover}
      className="item cursor-pointer remove-style-button"
    >
      <div className="text">
        Thư viện của bạn
        <CaretDownOutlined />
        <span className=" " />
      </div>
    </button>
  );

  const ContentPopoverLibrary = () => {
    return (
      <div className="popover-library">
        <TabContent />
        <ContainerContent togglePopover={togglePopover} />
      </div>
    );
  };

  return (
    <Popover
      onOpenChange={togglePopover}
      open={visible}
      placement="bottomLeft"
      content={<ContentPopoverLibrary />}
      trigger="click"
    >
      {activator}
    </Popover>
  );
}

export default PopoverLibrary;
