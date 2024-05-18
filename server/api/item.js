// server/api/item.js
import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  const data = [
    {
      id: 1,
      music_id: "example-music-id-1",
      memory_date: "2023-05-16T09:12:33.001Z",
      diary: "今日は楽しかった",
      image_path: "https://www.example.com/image1.jpg",
    },
    {
      id: 2,
      music_id: "example-music-id-2",
      memory_date: "2023-05-15T09:12:33.001Z",
      diary: "昨日は疲れた",
      image_path: "https://www.example.com/image2.jpg",
    },
    {
      id: 3,
      music_id: "example-music-id-3",
      memory_date: "2023-05-14T09:12:33.001Z",
      diary: "今日はリラックスできた",
      image_path: "https://www.example.com/image3.jpg",
    },
    {
      id: 4,
      music_id: "example-music-id-4",
      memory_date: "2023-05-13T09:12:33.001Z",
      diary: "友達と楽しい時間を過ごした",
      image_path: "https://www.example.com/image4.jpg",
    },
    {
      id: 5,
      music_id: "example-music-id-5",
      memory_date: "2023-05-12T09:12:33.001Z",
      diary: "新しいレストランを試した",
      image_path: "https://www.example.com/image5.jpg",
    },
    {
      id: 6,
      music_id: "example-music-id-6",
      memory_date: "2023-05-12T09:12:33.001Z",
      diary: "WTTKにボコされた",
      image_path: "https://www.example.com/image5.jpg",
    },
  ];

  return data;
});
