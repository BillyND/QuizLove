import React from "react";
import { listNewFeature } from "../../utils/constant";

const NewFeature = () => {
  return (
    <section className="new-feature container">
      <span className="new-feature-header">
        Hãy thử các tính năng cập nhật này
      </span>
      <div className="new-feature-list">
        {listNewFeature?.map((item, index) => {
          return (
            <div
              key={`${item?.title}-$${index}`}
              className="item cursor-pointer"
              style={{
                backgroundColor: item?.backgroundParent,
              }}
            >
              <img
                src={item?.image}
                className="thumbnail"
                style={{
                  backgroundColor: item?.backgroundColor,
                  padding: "0 50px",
                }}
                loading="lazy"
              />
              <div className="description">
                <span className="title">{item?.title}</span>
                <span className="description-sub">{item?.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

function HomeLogged(props) {
  return (
    <div className="home-logged container">
      <NewFeature />
    </div>
  );
}

export default HomeLogged;
