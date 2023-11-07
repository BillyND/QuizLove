import { Button } from "antd";
import { handleOpenModalAddCourse } from "../DetailsFolder/DetailFolder";

const EmptyDetailFolder = (props) => {
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

export default EmptyDetailFolder;
