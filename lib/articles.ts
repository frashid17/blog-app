import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";

import type { Articleitem } from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles");

const getSortedArticles = (): Articleitem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullpath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullpath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);
    if (dateOne.isBefore(dateTwo)) {
      return -1;
    } else if (dateTwo.isAfter(dateOne)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const getCategorisedArticles = (): Record<string, Articleitem[]> => {
  const sortedArticles = getSortedArticles();
  const categorisedArticles: Record<string, Articleitem[]> = {}; // Fix: Rename from getCategorisedArticles

  sortedArticles.forEach((article) => {
    if (!categorisedArticles[article.category]) {
      categorisedArticles[article.category] = []; // Fix: Correct object initialization
    }
    categorisedArticles[article.category].push(article);
  });
  
  return categorisedArticles;
};
