"use client";
import classNames from "classnames";
import { ChangeEvent, useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { changeSurahId } from "@/app/redux/reducers/CurrentSurahReducer";
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";
import { chapter_details_type, metadata_type } from "./quran_schema";

const FindChapter: FC<{ metaData: metadata_type }> = ({ metaData }) => {
  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const dispatch = useDispatch();
  const [chaptersData, setChaptersData] = useState<chapter_details_type[]>([]);
  const [searchValue, setSearchValue] = useState<string | any>("");

  useEffect(() => {
    if (metaData && metaData[0]?.chapter_details) {
      const chapter_details = metaData[0].chapter_details;
      const data = Array.isArray(chapter_details)
        ? (chapter_details as any).map((elem: any) => ({
            surahNo: elem.surahNo,
            surahName: elem.surahName,
            surahNameTranslation: elem.surahNameTranslation,
            totalAyah: elem.totalAyah,
          }))
        : [];
      setChaptersData(data);
    }
  }, [metaData]);

  // set search value in state
  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.currentTarget.value);

  // Filter chapters based on search input
  const filteredChapters = (chaptersData as any).filter(
    (elem: any) =>
      elem.surahName.toLowerCase().includes(searchValue.toLowerCase()) ||
      elem.surahNameTranslation
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      elem.surahNo.toString() === searchValue
  );

  // handling click chapter in result box
  const handleClickResultChaper = (elem: any) => {
    dispatch(changeSurahId(elem.surahNo));
    setSearchValue("");
  };
  return (
    <div
      className={classNames(
        ThemeScss.findSurahContainer,
        scss.findSurahContainer
      )}
    >
      {/* search form */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="search..."
          onChange={handleSearchValue}
          value={searchValue}
        />
      </form>

      {/* result box */}
      {searchValue.length > 0 && (
        <div
          className={classNames(
            ThemeScss.searchResultContainer,
            scss.searchResultContainer
          )}
        >
          {filteredChapters.length > 0 ? (
            filteredChapters.map((elem: any) => (
              <div
                key={elem.surahNo}
                className={classNames(ThemeScss.surahBox, scss.surahBox)}
                onClick={() => handleClickResultChaper(elem)}
              >
                <div className={classNames(ThemeScss.surahNo, scss.surahNo)}>
                  <p>{elem.surahNo}</p>
                </div>
                <div
                  className={classNames(ThemeScss.surahInfo, scss.surahInfo)}
                >
                  <p>{elem.surahName}</p>
                  <p className="raleway">
                    {elem.surahNameTranslation}
                    <span> - {elem.totalAyah} ayat</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No data found matching the criteria!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindChapter;
