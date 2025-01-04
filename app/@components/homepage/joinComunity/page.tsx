"use client";
import React from "react";
import NavigateButton from "../QuranicAbout/NavigateButton";

const JoinComunity: React.FC = () => {
  const NavigateButtonDataArray = [
    {
      title: "join our wide muslim community and explore collabratively.",
      text: "delve into the teachings of islam through authentic hadith and powerfull surah verses that offer guidenece and inspiration for your daily life.",
      btnText: "join now",
      btnHref: "/",
    },
  ];

  return (
    <>
      <NavigateButton dataArray={NavigateButtonDataArray} />
    </>
  );
};

export default JoinComunity;
