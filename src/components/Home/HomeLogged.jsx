import React, { useEffect } from "react";
import { listNewFeature, windowWidth } from "../../utils/constant";

const listRecent = [
  {
    title: "title 1",
    assembly: "36 thuật ngữ",
    thumbnail: "https://graph.facebook.com/1476086985906797/picture?type=large",
    name: "name user",
    role: "Giáo viên",
  },
  {
    title: "title 1",
    assembly: "36 thuật ngữ",
    thumbnail: "https://graph.facebook.com/1476086985906797/picture?type=large",
    name: "name user",
    role: "Giáo viên",
  },
  {
    title: "title 1",
    assembly: "36 thuật ngữ",
    thumbnail: "https://graph.facebook.com/1476086985906797/picture?type=large",
    name: "name user",
    role: "Giáo viên",
  },
];

const NewFeature = () => {
  return (
    <section className="new-feature container">
      <span className="new-feature-header">
        Hãy thử các tính năng cập nhật này
      </span>
      <div className="new-feature-list hidden-scrollbar">
        {listNewFeature?.map((item, index) => {
          return (
            <div
              key={`${item?.title}-$${index}`}
              className="item cursor-pointer shadow-card"
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

const RecentSection = () => {
  return (
    <section className="container main-recent-section">
      <span className="header-recent-section">Gần đây</span>
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
    </section>
  );
};

function HomeLogged(props) {
  return (
    <div className="home-logged container">
      <NewFeature />
      <RecentSection />
    </div>
  );
}

export default HomeLogged;
