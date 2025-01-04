"use client";
import classNames from "classnames";
import React from "react";

import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const NavigateButton = ({ dataArray }: any) => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  return (
    <>
      <section
        className={classNames(
          ThemeScss.NavigateButton_container,
          scss.NavigateButton_container
        )}
      >
        <main className={classNames("container")}>
          {dataArray.map((elem: any, index: any) => (
            <div
              className={classNames(
                ThemeScss.NavigateButton,
                scss.NavigateButton
              )}
              key={index}
            >
              <div
                className={classNames(
                  ThemeScss.NavigateBtnSect_text_Btn_wrapper1,
                  scss.NavigateBtnSect_text_Btn_wrapper1
                )}
              ></div>

              <div
                className={classNames(
                  ThemeScss.NavigateBtnSect_text_Btn_wrapper2,
                  scss.NavigateBtnSect_text_Btn_wrapper2
                )}
              >
                <div
                  className={classNames(
                    ThemeScss.NavigateButton_text,
                    scss.NavigateButton_text
                  )}
                >
                  <h4 className="raleway">{elem.title}</h4>
                  <p>{elem.text}</p>
                </div>
                <button
                  className={classNames(
                    ThemeScss.NavigateButton_button,
                    scss.NavigateButton_button
                  )}
                >
                  <a href={elem.btnHref}>{elem.btnText}</a>
                </button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </>
  );
};

export default NavigateButton;
