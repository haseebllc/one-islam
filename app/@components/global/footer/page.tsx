"use client";

import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { useGContext } from "@/app/contextApi/contextApi";
import { contentArray } from "./ContentArray";
// scss
import scss from "./page.module.scss";
import light from "./light.module.scss";
import dark from "./dark.module.scss";
// img
import instagram__png from "@/public/images/logo/instagram.png";
import facebook__png from "@/public/images/logo/facebook.png";
import tiktok__png from "@/public/images/logo/tik-tok.png";

const Footer = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className={classNames(ThemeScss.FooterBg, scss.FooterBg)}>
        <div className={classNames(ThemeScss.Footer, scss.Footer)}>
          <main className={classNames("container")}>
            <div className={classNames(ThemeScss.FooterGrid, scss.FooterGrid)}>
              {(contentArray as any).map((elem: any, index: number) => (
                <div
                  key={index}
                  className={classNames(
                    ThemeScss.something,
                    scss.GridBox,
                    scss[`GridBox` + (index + 1)]
                  )}
                >
                  <h6
                    className={classNames(ThemeScss.title, scss.title, "syne")}
                  >
                    {elem.title}
                  </h6>
                  <ul>
                    {elem.links.map((elem, index) => (
                      <li
                        className={classNames(ThemeScss.lists, scss.lists)}
                        key={index}
                      >
                        <a
                          href={elem.linkHref}
                          className={classNames(
                            ThemeScss.links,
                            scss.links,
                            "raleway"
                          )}
                        >
                          <p>{elem.linkText}</p>
                          <span className="material-symbols-outlined">
                            chevron_right
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div
                className={classNames(
                  ThemeScss.GridBox,
                  scss.GridBox,
                  ThemeScss.GridBox4,
                  scss.GridBox4
                )}
              >
                <h6 className={classNames(ThemeScss.title, scss.title, "syne")}>
                  get in touch
                </h6>
                <div className={classNames(ThemeScss.formBox, scss.formBox)}>
                  <p className="raleway">subscribe to our email newsletter</p>
                  <form action="/">
                    <input type="email" placeholder="Your email" required />
                    <button className="raleway">subscribe</button>
                  </form>
                </div>

                <div
                  className={classNames(
                    ThemeScss.socialIconsWrap,
                    scss.socialIconsWrap
                  )}
                >
                  <p className="raleway">follow us __</p>
                  <div
                    className={classNames(ThemeScss.iconsRow, scss.iconsRow)}
                  >
                    {(
                      [
                        { img: instagram__png, href: "/" },
                        { img: tiktok__png, href: "/" },
                        { img: facebook__png, href: "/" },
                      ] as any
                    ).map((elem: any, index: number) => (
                      <a href={elem.href} key={index}>
                        <Image src={elem.img} alt="icon" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* copyright stamp */}
            <div
              className={classNames(
                ThemeScss.copyRightStamp,
                scss.copyRightStamp
              )}
            >
              <p className="raleway">
                copyright © 2024 - {currentYear} - oneislam all right reserved
              </p>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Footer;
