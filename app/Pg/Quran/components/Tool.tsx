// tools.tsx
"use client";
import classNames from "classnames";
interface propType {
  classTxt: string;
  icon: string;
  text: string;
}
// scss
import scss from "../page.module.scss";
import light from "../theme/light.module.scss";
import dark from "../theme/dark.module.scss";
import { useGContext } from "@/app/contextApi/contextApi";

const Tool = ({ props }: { props: propType }) => {
  // theme
  const { theme } = useGContext();
  const ThemeScss = theme === "light" ? light : dark;

  const { classTxt, icon, text } = props;
  return (
    <>
      <div className={classNames(scss[classTxt], ThemeScss.tool, scss.tool)}>
        <div className={classNames(ThemeScss.toolAbslt, scss.toolAbslt)}>
          <div>
            <span></span>
            <p>{text}</p>
          </div>
        </div>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </>
  );
};
export default Tool;

export const toolsArray = [
  {
    classTxt: "scrollToCurrent_tool",
    icon: "sync_alt",
    text: "scroll into view",
  },
  {
    classTxt: "resize_tool",
    icon: "fit_screen",
    text: "full screen",
  },
  {
    classTxt: "secLang_tool",
    icon: "language",
    text: "second language",
  },
];
