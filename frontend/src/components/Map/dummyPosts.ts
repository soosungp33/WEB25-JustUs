import shortid from "shortid";

const postsInfo = [
  {
    postID: 0,
    postTitle: "강남역",
    postContent: "#스타벅스 #리저브 다녀옴",
    postDate: "2021.1.11 목",
    userNickname: "그룹원1",
    postImages: [
      { file: "/img/post1-1.jpeg", key: shortid.generate() },
      { file: "/img/post1-2.jpeg", key: shortid.generate() },
      { file: "/img/post1-3.jpeg", key: shortid.generate() },
    ],
    postLatitude: 37.497912,
    postLongitude: 127.027616,
  },
  {
    postID: 1,
    postTitle: "이수역",
    postContent: "고기 먹음\n\n#미나리삼겹살",
    postDate: "2021.2.22 금",
    userNickname: "그룹원2",
    postImages: [
      { file: "/img/post2-1.jpeg", key: shortid.generate() },
      { file: "/img/post2-2.jpeg", key: shortid.generate() },
      { file: "/img/post2-3.jpeg", key: shortid.generate() },
      { file: "/img/post2-4.jpeg", key: shortid.generate() },
    ],
    postLatitude: 37.48670440494385,
    postLongitude: 126.98218497576075,
  },
  {
    postID: 2,
    postTitle: "옥수역",
    postContent: "공원 다녀옴 #가을 하늘이 아직 안와서 푸르른 #나무 들 많이 볼 수 있어 좋았음😃",
    postDate: "2021.3.31 토",
    userNickname: "그룹원3",
    postImages: [
      { file: "/img/post3-1.jpeg", key: shortid.generate() },
      { file: "/img/post3-2.jpeg", key: shortid.generate() },
      { file: "/img/post3-3.jpeg", key: shortid.generate() },
      { file: "/img/post3-4.jpeg", key: shortid.generate() },
      { file: "/img/post3-5.jpeg", key: shortid.generate() },
    ],
    postLatitude: 37.54049696552621,
    postLongitude: 127.01873018465605,
  },
  {
    postID: 3,
    postTitle: "롯데월드",
    postContent: "ㅇㅇ친구랑 롯데월드 \n\n #롯데월드",
    postDate: "2021.5.3 토",
    userNickname: "그룹원4",
    postImages: [{ file: "/img/post4-1.jpeg", key: shortid.generate() }],
    postLatitude: 37.511267024754666,
    postLongitude: 127.0980426496118,
  },
  {
    postID: 4,
    postTitle: "미삼집",
    postContent: "고기 또 먹으러 옴 #미삼집 #고기 #미나리",
    postDate: "2021.8.3 토",
    userNickname: "그룹원5",
    postImages: [{ file: "/img/post5-1.jpeg", key: shortid.generate() }],
    postLatitude: 37.15138152054115,
    postLongitude: 127.07322113864778,
  },
  {
    postID: 5,
    postTitle: "남산타워",
    postContent: "남산 데이트 #남산 #돈까스 #N서울타워 #남산타워 #남산서울타워",
    postDate: "2021.8.3 토",
    userNickname: "그룹원5",
    postImages: [{ file: "/img/post6-1.jpeg", key: shortid.generate() }],
    postLatitude: 37.551382027533194,
    postLongitude: 126.98817295397293,
  },
  {
    postID: 6,
    postTitle: "후쿠오카",
    postContent: "후쿠오카 짱 좋넹😎 ",
    postDate: "2021.8.3 토",
    userNickname: "그룹원5",
    postImages: [{ file: "/img/post7-1.jpeg", key: shortid.generate() }],
    postLatitude: 33.560126973098605,
    postLongitude: 130.38719144055108,
  },
];

export default postsInfo;