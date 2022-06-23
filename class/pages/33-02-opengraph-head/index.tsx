// import { useQuery } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

export default function OpengraphPage() {
  const { data } = useQuery(FETCH_BOARD, {
    variables: "62b16ea203610b002998fc1e",
  });

  return (
    <div>
      <Head>
          <img alt="이이미지는 OOO이미지입니다~"/>
        <meta property="og:title" content={data?.fetchBoard.title} />
        <meta
          property="og:description"
          content="나만의 사이트에 오신것을 환영합니다."
        />
        <meta property="og:image" content="http://~~~~" />
      </Head>
      <h1>오픈그래프 연습 페이지</h1>
    </div>
  );
}
