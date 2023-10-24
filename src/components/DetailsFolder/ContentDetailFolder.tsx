import React from "react";
import { useSubscription } from "../../utils/globalStateHook";
import { EmptyDetailFolder, detailFolderSubscription } from "./DetailFolder";
import { windowWidth } from "../../utils/constant";

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

export default ContentDetailFolder;
