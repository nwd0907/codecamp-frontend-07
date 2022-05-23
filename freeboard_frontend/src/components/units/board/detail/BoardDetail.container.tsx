import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";
import { DISLIKE_BOARD, FETCH_BOARD, LIKE_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();
  const [likeBoard] = useMutation(LIKE_BOARD);

  const [dislikeBoard] = useMutation(DISLIKE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  const onClickMoveToBoardList = () => {
    router.push("/boards");
  };

  const onClickMoveToBoardEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  const onClickLike = () => {
    likeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.boardId } },
      ],
    });
  };

  const onClickDislike = () => {
    dislikeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.boardId } },
      ],
    });
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
    />
  );
}
