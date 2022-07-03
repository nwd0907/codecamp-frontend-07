import { useRouter } from "next/router";
import { gql, request } from "graphql-request";
import Head from "next/head";

export default function BoardsDetailPage(props) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta property="og:title" content={props?.fetchBoard.title} />
        <meta property="og:description" content={props?.fetchBoard.contents} />
        <meta property="og:image" content={props?.fetchBoard.images?.[0]} />
      </Head>
      <div>
        안녕하세요! 게시글 상세페이지 입니다!!!, 게시글 ID는
        {router.query.boardId} 입니다!!!
      </div>
    </div>
  );
}

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      title
      contents
      images
    }
  }
`;

export const getServerSideProps = async (context) => {
  // 여기서 fetchBoard 요청하기
  const result = await request(
    "https://backend07.codebootcamp.co.kr/graphql",
    FETCH_BOARD,
    { boardId: context.query.boardId }
  );

  return {
    props: {
      fetchBoard: {
        title: result.fetchBoard.title,
        contents: result.fetchBoard.contents,
        images: result.fetchBoard.images,
      },
    },
  };
};
