import { Skeleton } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";

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

export default SkeletonDetailFolder;
