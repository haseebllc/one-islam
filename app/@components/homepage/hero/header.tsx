"use client";
import classNames from "classnames";
import React from "react";

// styles
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const Header = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  return (
    <>
      <header className={classNames(ThemeScss.heroHeader, scss.heroHeader)}>
        <nav
          className={classNames(ThemeScss.heroHeader_Nav, scss.heroHeader_Nav)}
        >
          <p
            className={classNames(
              ThemeScss.heroHeaderNav_Text,
              scss.heroHeaderNav_Text,
              "syne"
            )}
          >
            Explore Perfect Islam
          </p>
          <ul
            className={classNames(
              ThemeScss.heroHeaderNav_Ul,
              scss.heroHeaderNav_Ul
            )}
          >
            {(
              [
                "islamic events",
                "find qibla",
                "islamic calender",
                "api-docs",
              ] as any
            ).map((item: any) => (
              <li
                key={item}
                className={classNames(
                  ThemeScss.heroHeaderNavUl_li,
                  scss.heroHeaderNavUl_li
                )}
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
