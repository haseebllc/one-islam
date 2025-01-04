"use client";
import classNames from "classnames";
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";

import { useGContext } from "@/app/contextApi/contextApi";
import { useState } from "react";

export const HadithPageTools = ({ book_chapter_ref }) => {
  const { theme } = useGContext();
  const themeScss = theme === "light" ? light : dark;

  const [inputVal, setInputVal] = useState<string>("");
  const {
    setChangeHadithBookChapterState,
    setCurrentHadithDetailsState,
    set_scroll_to_first_hadith,
    set_scroll_to_last_hadith,
  } = useGContext();

  // scroll into view
  const handleScrollIntoView = (book_chapter_ref: any) => {
    if (book_chapter_ref) {
      book_chapter_ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <div className={classNames(themeScss.tools__wrap, scss.tools__wrap)}>
        <div
          className={classNames(
            themeScss.tools__wrap__innnerFlex,
            scss.tools__wrap__innnerFlex
          )}
        >
          {/* col 1  */}
          <div
            className={classNames(
              themeScss.innerFlex_col,
              scss.innerFlex_col,
              themeScss.innerFlex_col1,
              scss.innerFlex_col1
            )}
          >
            {/* toggle details */}
            <div
              className={classNames(
                themeScss.change__book_chapter,
                scss.change__book_chapter,
                themeScss.tool,
                scss.tool
              )}
              onClick={() => setChangeHadithBookChapterState(true)}
            >
              <HeaderTool_col1
                text={"change book & chapter"}
                icon={"stylus_note"}
                themeScss={themeScss}
              />
            </div>
            <div
              className={classNames(
                themeScss.tools__toggleDetails,
                scss.tools__toggleDetails,
                themeScss.tool,
                scss.tool
              )}
              onClick={() => setCurrentHadithDetailsState((prev) => !prev)}
            >
              <HeaderTool_col1
                text={"toggle details view"}
                icon={"view_apps"}
                themeScss={themeScss}
              />
            </div>
          </div>
          {/* col 2  */}
          <div
            className={classNames(
              themeScss.innerFlex_col,
              scss.innerFlex_col,
              themeScss.innerFlex_col2,
              scss.innerFlex_col2
            )}
          >
            <div
              className={classNames(
                themeScss.tool_scrollInToView,
                scss.tool_scrollInToView
              )}
              onClick={() => handleScrollIntoView(book_chapter_ref)}
            >
              <HeaderTool_col2
                text1={"scroll"}
                text2={"into-view"}
                icon={"dashboard"}
                themeScss={themeScss}
              />
            </div>
            <div
              className={classNames(
                themeScss.scrollToFirstHadith,
                scss.scrollToFirstHadith
              )}
              onClick={() => set_scroll_to_first_hadith(true)}
            >
              <HeaderTool_col2
                text1={"scroll-to"}
                text2={"first hadith"}
                icon={"arrow_upward_alt"}
                themeScss={themeScss}
              />
            </div>
            <div
              className={classNames(
                themeScss.scrollToLastHadith,
                scss.scrollToLastHadith
              )}
              onClick={() => set_scroll_to_last_hadith(true)}
            >
              <HeaderTool_col2
                text1={"scroll-to"}
                text2={"last hadith"}
                icon={"arrow_downward_alt"}
                themeScss={themeScss}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const HeaderTool_col1 = ({ text, icon, themeScss }) => {
  return (
    <>
      <div
        className={classNames(themeScss.headerTool_col1, scss.headerTool_col1)}
      >
        <div>
          <p className={classNames("syne")}>
            <span className={classNames("syne")}>{text}</span>
          </p>
        </div>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </>
  );
};

export const HeaderTool_col2 = ({ text1, text2, icon, themeScss }) => {
  return (
    <>
      <div
        className={classNames(themeScss.headerTool_col2, scss.headerTool_col2)}
      >
        <p className={classNames("syne")}>{text1}</p>
        <div>
          <p className={classNames("syne")}>{text2}</p>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
    </>
  );
};
