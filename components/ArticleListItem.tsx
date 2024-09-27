// components/ArticleItemList.tsx
"use client"; // Add this at the top of your file

import React from "react";
import type { Articleitem } from "@/types";

type Props = {
  category: string;
  articles: Articleitem[];
};

const ArticleItemList: React.FC<Props> = ({ category, articles }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl">{category}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="my-4">
            <h3 className="text-lg">{article.title}</h3>
            <p>{article.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleItemList;
