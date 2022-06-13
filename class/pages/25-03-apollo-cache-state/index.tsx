import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
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
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickDelete = (boardId: string) => async () => {
    await deleteBoard({
      variables: {
        boardId,
      },
      //   refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              const deletedId = data.deleteBoard;
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId // el._id가 안되므로, readField에서 꺼내오기
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async () => {
    await createBoard({
      variables: {
        createBoardInput: {
          writer: "영희",
          password: "1234",
          title: "제목입니다~~",
          contents: "내용입니다@@@",
        },
      },
      //   refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <MyRow key={el._id}>
          <MyColumn>{el._id}</MyColumn>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </MyRow>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}

// // 1.
// function onClickAAA(aaa){ // const aaa = "철수"

// }

// onClickAAA("철수")

// // 2.
// function onClickAAA(aaa){  // const aaa = { name: "철수", age: 13 }

// }

// onClickAAA({ name: "철수", age: 13 })

// // 3.
// function onClickAAA(school, { name, age }){  // const aaa = { name: "철수", age: 13 }

// }

// onClickAAA("다람쥐초등학교", { name: "철수", age: 13 })

// // 4.
// function createUser(name, age, school){

// }

// const name = "철수"
// const age = 13
// const school = "다람쥐초등학교"
// createUser(name, age, school)

// // 5.
// function createUser({ name, age, school }){

// }

// const profile = {
//     name: "철수",
//     age: 13,
//     school: "다람쥐초등학교"
// }
// createUser(profile)

// // 6.
// function createUser({ name, age, school }){

// }

// const name = "철수"
// const age = 13
// const school = "다람쥐초등학교"
// createUser({ name, age, school })
