import { CaretDownOutlined } from "@ant-design/icons";
import { Popover, Tabs } from "antd";
import React, { useState } from "react";
import "./PopoverLibrary.scss";
import { getFolderByCondition } from "../../services/api";
import {
  createSubscription,
  useSubscription,
} from "../../utils/globalStateHook";

export const popoverLibSubscription = createSubscription({
  contentLib: [],
  loading: false,
});

const TabContent = () => {
  const { setState } = useSubscription(popoverLibSubscription, ["contentLib"]);

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
        const resFolder = await getFolderByCondition({});
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
  return <Tabs items={items} onChange={handleFetchContent} />;
};

const ContainerContent = () => {
  const {
    state: { contentLib },
  } = useSubscription(popoverLibSubscription, ["contentLib"]);

  console.log(">>>contentLib:", contentLib);
  return (
    <div>
      {contentLib?.map((item) => {
        return <div key={item?._id}>{item?.name}</div>;
      })}
    </div>
  );
};

function PopoverLibrary(props) {
  const { locationNow, handleMoveLocation } = props;
  const [loading, setLoading] = useState(false);
  const [tabActive, setTabActive] = useState(1);

  const activator = (
    <button className="item cursor-pointer remove-style-button">
      <div className="text">
        Thư viện của bạn
        <CaretDownOutlined />
        <span
          className="line-footer-nav"
          style={{
            opacity: locationNow?.pathname?.includes("/subjects") ? "1" : "",
          }}
        />
      </div>
    </button>
  );

  const ContentPopoverLibrary = () => {
    return (
      <div className="p-3 popover-library">
        <TabContent />
        <ContainerContent />
      </div>
    );
  };

  return (
    <Popover
      placement="bottomLeft"
      content={<ContentPopoverLibrary />}
      trigger="click"
    >
      {activator}
    </Popover>
  );
}

export default PopoverLibrary;
