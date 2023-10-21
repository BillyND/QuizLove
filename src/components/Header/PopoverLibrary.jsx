import { CaretDownOutlined } from "@ant-design/icons";
import { Popover, Skeleton, Tabs } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getFolderByCondition } from "../../services/api";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";
import SkeletonCustom from "../Loading/SkeletonCustom";
import "./PopoverLibrary.scss";

export const popoverLibSubscription = createSubscription({
  contentLib: [],
  loading: false,
  visible: false,
});

const TabContent = () => {
  const { setState } = useSubscription(popoverLibSubscription);

  const handleFetchContent = async (key) => {
    setState({ loading: true });
    try {
      if (key === 1) {
        setState({ contentLib: [] });
      }
      if (key === 2) {
        setState({ contentLib: [] });
      }
      if (key === 3) {
        const resFolder = await getFolderByCondition({ hasAuthorId: true });
        setState({ contentLib: resFolder?.data });
      }
      if (key === 4) {
        setState({ contentLib: [] });
      }
      setState({ loading: false });
    } catch (error) {
      setState({ loading: false });
    }
  };
  const items = [
    {
      key: 1,
      label: "Học phần",
    },
    {
      key: 2,
      label: "Lời giải chuyên gia",
    },
    {
      key: 3,
      label: "Thư mục",
    },
    {
      key: 4,
      label: "Lớp học",
    },
  ];
  return (
    <Tabs className="pt-3 px-3" items={items} onChange={handleFetchContent} />
  );
};

const ContainerContent = (props) => {
  const { togglePopover } = props;

  const {
    state: { contentLib, loading },
  } = useSubscription(popoverLibSubscription, ["contentLib", "loading"]);
  const navigate = useNavigate();

  const handleSelectFolder = (item) => {
    navigate(`/folders/${item?._id}`);
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
              <div className="content">
                <div className="title"> {item?.name}</div>
                <div className="length-course">
                  {`${item?.source?.length || 0} học phần`}
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
