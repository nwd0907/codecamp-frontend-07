import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";

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

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

export default function MapBoardPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [myIndex, setMyIndex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const onClickEdit = (event) => {
    const aaa = [...myIndex];
    aaa[Number(event.target.id)] = true;
    console.log(aaa);
    console.log(myIndex);
    setMyIndex(aaa);

    // setMyIndex(Number(event.target.id));
  };

  return (
    <div>
      {data?.fetchBoards.map((el: any, index) => (
        <div key={el._id}>
          {myIndex[index] === false && (
            <MyRow key={el._id}>
              <MyColumn>{el.writer}</MyColumn>
              <MyColumn>{el.title}</MyColumn>
              <button id={index} onClick={onClickEdit}>
                수정하기
              </button>
            </MyRow>
          )}
          {myIndex[index] === true && <div>수정하기 화면입니다!</div>}
        </div>
      ))}
    </div>
  );
}
