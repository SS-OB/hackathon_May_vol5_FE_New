// server/api/item.js
import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  const data = [
    {
      id: 1,
      music_id: "6jEVAnwC1SfmenU3wJCohS",
      memory_date: "2023-05-16",
      diary: "キャンプに行った",
      image_path: "/camp.jpg",
    },
    {
      id: 2,
      music_id: "5blG2vXcJC2n9l3rb5sCOr",
      memory_date: "2023-05-15",
      diary: "ハンバーガーを食べた",
      image_path: "/hamberger.jpg",
    },
    {
      id: 3,
      music_id: "4vK66v7hfRlG3X1ZXpzy6M",
      memory_date: "2023-05-14",
      diary: "焼肉！！！！！",
      image_path: "/meat.jpg",
    },
    {
      id: 4,
      music_id: "5mjkeVu24NbkHeX8zt7muo",
      memory_date: "2023-05-13",
      diary: "友達と楽しい時間を過ごした",
      image_path: "/otsumami.jpg",
    },
    {
      id: 5,
      music_id: "0bYg9bo50gSsH3LtXe2SQn",
      memory_date: "2023-05-12",
      diary: "クリスマスの渋谷",
      image_path: "/shibuya.jpg",
    },
    {
      id: 6,
      music_id: "0xYSgQHddr1lh6IfqWgn2W",
      memory_date: "2023-05-12",
      diary: "大学同期とスキー！！",
      image_path: "/ski.jpg",
    },
  ];

  return data;
});
