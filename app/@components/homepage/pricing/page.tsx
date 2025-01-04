"use client";
// components/pricig

// scss
import classNames from "classnames";
import scss from "./page.module.scss";

import light from "./light.module.scss";
import dark from "./dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const PricingDonate: React.FC = () => {
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;
  return (
    <>
      <section
        className={classNames(
          ThemeScss.PricingDonate__container,
          scss.PricingDonate__container
        )}
      >
        <main className={classNames("container")}>
          {/* heading */}
          <div className={classNames(ThemeScss.heading, scss.heading)}>
            <div
              className={classNames(
                ThemeScss.heading_pseudo,
                scss.heading_pseudo
              )}
            >
              <span></span>
            </div>
            <div
              className={classNames(ThemeScss.heading_text, scss.heading_text)}
            >
              <h4 className="syne">
                A littke donate US for you to intouch with us.
              </h4>
            </div>
          </div>

          {/* content */}

          <div
            className={classNames(ThemeScss.content__wrap, scss.content__wrap)}
          >
            {(
              [
                {
                  plan: "basic donate",
                  price: "$0.99",
                  planType: "monthly",
                  btnText: "donate now",
                  btnHref: "/",
                  services: [
                    { service: "Feature 1 included" },
                    { service: "Feature 2 included" },
                    { service: "Feature 3 included" },
                  ],
                },
                {
                  plan: "professionally donate",
                  price: "$5.99",
                  planType: "annually",
                  btnText: "donate now",
                  btnHref: "/",
                  services: [
                    { service: "Feature 1 included" },
                    { service: "Feature 2 included" },
                    { service: "Feature 3 included" },
                    { service: "Feature 4 included" },
                  ],
                },
                {
                  plan: "one time donate",
                  price: "$9.99",
                  planType: "once",
                  btnText: "donate now",
                  btnHref: "/",
                  services: [
                    { service: "Feature 1 included" },
                    { service: "Feature 2 included" },
                    { service: "Feature 3 included" },
                    { service: "Feature 4 included" },
                    { service: "Feature 5 included" },
                  ],
                },
              ] as any
            ).map((elem: any, index: number) => (
              <div key={index}>
                <div
                  className={classNames(
                    ThemeScss.content__box,
                    scss.content__box
                  )}
                >
                  {/* plan text */}
                  <p className={classNames(ThemeScss.text, scss.text)}>
                    {elem.plan}
                  </p>
                  {/* plan price  */}
                  <div className={classNames(ThemeScss.price, scss.price)}>
                    <h3>{elem.price}</h3>
                    <p>{elem.planType}</p>
                  </div>
                  {/* services included */}
                  <div
                    className={classNames(ThemeScss.services, scss.services)}
                  >
                    <ul>
                      {elem.services.map((elem, index) => (
                        <li key={index}>
                          <span className="material-symbols-outlined">
                            check
                          </span>
                          <p>{elem.service}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* payout button */}
                  <button className={classNames(ThemeScss.button, scss.button)}>
                    <a href={elem.btnHref}>
                      <p>{elem.btnText}</p>
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default PricingDonate;
