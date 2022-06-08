import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";

export default function BoardList() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);

  const onClickMoveToBoardNew = () => {
    router.push("/boards/new");
  };

  const onClickMoveToBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/${event.currentTarget.id}`);
  };

  function onChangeKeyword(value: string) {
    setKeyword(value);
  }

  return (
    <BoardListUI
      data={data}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      refetch={refetch}
      refetchBoardsCount={refetchBoardsCount}
      count={dataBoardsCount?.fetchBoardsCount}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
}
