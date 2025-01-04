// change book and chapter
"use client";
import classNames from "classnames";

import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";

import { useEffect, useState } from "react";
import {
  fetch_hadith_allBook_metadata,
  fetch_hadith_book_metadata,
} from "./FetchHadith";
import { useDispatch, useSelector } from "react-redux";
import {
  changeHadithBook,
  changeHadithChapter,
} from "@/app/redux/reducers/CurrentHadithReducer";
import { useGContext } from "@/app/contextApi/contextApi";

const ChangeBookChap = () => {
  const { theme } = useGContext();
  const themeScss = theme === "light" ? light : dark;

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [bookName, setBookName] = useState("");
  const [chapterInfo, setChapterInfo] = useState("");
  const [bookPageView, setBookPageView] = useState(true);

  // hadith state from redux --
  const dispatch = useDispatch();
  const CurrentHadithSlice_state = useSelector(
    (state: any) => state.CurrentHadithSlice_key
  );
  useEffect(() => {
    if (CurrentHadithSlice_state) {
      setBookName(CurrentHadithSlice_state.book);
      setChapterInfo(CurrentHadithSlice_state.chapter);
    }
  }, [CurrentHadithSlice_state.book, CurrentHadithSlice_state.chapter]);

  // fetch books and chapters for selection --
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const bookdata = await fetch_hadith_allBook_metadata();
      if (bookdata) setBooks(bookdata);
      if (CurrentHadithSlice_state) {
        const chapterdata = await fetch_hadith_book_metadata(
          CurrentHadithSlice_state.book
        );
        if (chapterdata) setChapters([chapterdata]);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [CurrentHadithSlice_state.book, CurrentHadithSlice_state.chapter]);

  // change book functionality
  const handleBookBoxClick = (book: string) => {
    dispatch(changeHadithBook(book));
    alert("book changed to: " + book);
  };
  // change chapter functionality
  const handleChapterBoxClick = (chapter: number) => {
    dispatch(changeHadithChapter(chapter));
    alert("chapter changed to: " + chapter);
  };

  // state from context to show/hide book/chapter change-box
  const { setChangeHadithBookChapterState } = useGContext();

  return (
    <>
      <div
        className={classNames(
          themeScss.change__book_nd_chapter,
          scss.change__book_nd_chapter
        )}
      >
        {/* book/chapter change-box close/hide button */}
        <div
          className={classNames(
            themeScss.change__book_nd_chapter_close_btnWrap,
            scss.change__book_nd_chapter_close_btnWrap
          )}
        >
          <div
            className={classNames(
              themeScss.change__book_nd_chapter_close_btn,
              scss.change__book_nd_chapter_close_btn
            )}
            onClick={() => setChangeHadithBookChapterState(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>

        {/* book, chapter navigator */}
        <div
          className={classNames(
            themeScss.selector_container,
            scss.selector_container
          )}
        >
          <div
            className={classNames(themeScss.book_selector, scss.book_selector)}
          >
            <p
              className={classNames(
                bookPageView ? themeScss.active : "",
                "syne"
              )}
              onClick={() => setBookPageView(true)}
            >
              book
            </p>
          </div>
          <div
            className={classNames(
              themeScss.chapter_selector,
              scss.chapter_selector
            )}
          >
            <p
              className={classNames(
                !bookPageView ? themeScss.active : "",
                "syne"
              )}
              onClick={() => setBookPageView(false)}
            >
              chapter
            </p>
          </div>
        </div>

        {/* selected items-showing */}
        <div
          className={classNames(
            themeScss.selected_book_chapter,
            scss.selected_book_chapter
          )}
        >
          selected book: <span>( {bookName} )</span> & chapter:
          <span>( {chapterInfo} )</span>
        </div>

        {/* book/chapter view */}
        {loading ? (
          <>
            <p>loading...</p>
          </>
        ) : (
          <>
            {bookPageView ? (
              <>
                {/* books view */}
                <div
                  className={classNames(
                    themeScss.books_view_box,
                    scss.books_view_box
                  )}
                >
                  {books.map((book: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className={classNames(themeScss.bookBox, scss.bookBox)}
                        onClick={() =>
                          handleBookBoxClick(book.book_name_english)
                        }
                      >
                        <div
                          className={classNames(
                            themeScss.bookName,
                            scss.bookName
                          )}
                        >
                          <p className={classNames("raleway")}>
                            {book.book_name_english}
                          </p>
                          <p> ( {book.book_name_arabic} )</p>
                        </div>
                        <div
                          className={classNames(
                            themeScss.boookInfo,
                            scss.boookInfo
                          )}
                        >
                          <div
                            className={classNames(
                              "syne",
                              themeScss.bookDesc,
                              scss.bookDesc
                            )}
                          >
                            {book.book_short_desc}
                          </div>
                          <p>hadiths: ({book.total_hadiths_inBook})</p>
                          <p>chapters: ({book.total_chapters_inBook})</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* chapters view  */}
                <div
                  className={classNames(
                    themeScss.chapters_view_box,
                    scss.chapters_view_box
                  )}
                >
                  {chapters.length > 0 &&
                    chapters[0].all_chapters_detail.map(
                      (chapter: any, idx: number) => {
                        return (
                          <div
                            key={idx}
                            className={classNames(
                              themeScss.chapterBox,
                              scss.chapterBox
                            )}
                            onClick={() => handleChapterBoxClick(idx + 1)}
                          >
                            <div
                              className={classNames(
                                themeScss.chapterName,
                                scss.chapterName
                              )}
                            >
                              <p
                                className={classNames(
                                  "syne",
                                  themeScss.chapterTitleEng,
                                  scss.chapterTitleEng
                                )}
                              >
                                <span>({idx + 1})</span>{" "}
                                {chapter.chapter_title_english}
                              </p>
                              <p
                                className={classNames(
                                  themeScss.chapterTitleAra,
                                  scss.chapterTitleAra
                                )}
                              >
                                {chapter.chapter_title_arabic}
                              </p>
                            </div>
                            <div
                              className={classNames(
                                themeScss.chapterInfo,
                                scss.chapterInfo
                              )}
                            >
                              <p>hadiths: {chapter.total_hadiths_inChapter}</p>
                              <p>
                                first hadith: {chapter.chapter_first_hadith}
                              </p>
                              <p>last hadith: {chapter.chapter_last_hadith}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChangeBookChap;
