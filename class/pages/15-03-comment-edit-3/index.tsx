import { useQuery, gql } from "@apollo/client";
import BoardCommentItem from "../../src/components/units/board/15-board-comment-item";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function MapBoardPage() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <div>
      {data?.fetchBoards.map((el: any) => (
        <BoardCommentItem key={el._id} el={el} />
      ))}
    </div>
  );
}
