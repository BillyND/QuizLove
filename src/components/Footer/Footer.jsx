import { createFromIconfontCN } from "@ant-design/icons";
import React, { useEffect } from "react";
import { getDraftCourse } from "../../services/api";
import { draftCourse } from "../CreateCourse/CreateCourse";

export const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

export const handleGetDraftCourse = async () => {
  const resGetDraftCourse = await getDraftCourse();

  if (resGetDraftCourse?.data?.[0]) {
    draftCourse.updateState({
      title: resGetDraftCourse?.data?.[0]?.title,
      description: resGetDraftCourse?.data?.[0]?.description,
      questions: resGetDraftCourse?.data?.[0]?.questions,
    });
  }
};

function Footer(props) {
  useEffect(() => {
    handleGetDraftCourse();
  }, []);

  return (
    <footer className="footer-quiz-love none-copy container">
      {/* Top */}
      <div className="footer-top">top</div>

      {/* Bottom */}
      <div className="footer-bottom">
        {/* Bottom left */}
        <div className="bottom-left">
          <div className="button-left-link">
            <a
              target="_blank"
              href="https://github.com/BillyND"
              rel="noreferrer"
            >
              <IconFont type="icon-github" className="IconFont" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/ndl.621/"
              rel="noreferrer"
            >
              <IconFont type="icon-facebook" className="IconFont" />
            </a>
            <a
              target="_blank"
              href="https://github.com/BillyND"
              rel="noreferrer"
            >
              <IconFont type="icon-twitter" className="IconFont" />
            </a>
            <a
              target="_blank"
              href="https://github.com/BillyND"
              rel="noreferrer"
            >
              <svg
                className="IconFont"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M941.3 296.1c-10.3-38.6-40.7-69-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7C123.3 227 93 257.4 82.7 296 64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path>
              </svg>
            </a>
          </div>
          <div className="button-left-copy-right">
            © <span>2023</span> QuizLove, Inc.
          </div>
        </div>

        {/* Bottom right */}
        <div className="bottom-right">
          <img
            src="https://assets.quizlet.com/a/j/dist/app/i/global/footer/coppa-seal.0efe00c12ef68aa.png"
            width="140"
            height="70"
            alt="COPPA Safe Harbor Certification seal"
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
