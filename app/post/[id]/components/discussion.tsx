"use client";

import ButtonInline from "@/components/button-inline";
import ContentBox from "@/components/content-box";
import HeaderSubtle from "@/components/header-subtle";
import AuthorCard from "./author-card";

// TODO contents as props
export default function Discussion() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";

  return (
    <ContentBox>
      <div className="flex flex-col items-stretch gap-y-2">
        <div className="flex flex-row items-baseline gap-x-2">
          {/* TODO link to profile */}
          <p className="font-semibold">John Doe</p>
          <HeaderSubtle>wrote on 10 May 2024</HeaderSubtle>
          <div className="grow" />
          <div>
            <ButtonInline label="Reply" onClick={() => {}} />
          </div>
        </div>
        <p>{someText}</p>
      </div>
    </ContentBox>
  );
}
