import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  const [data, setData] = useState({});
  const [callGraphql] = useMutation(CREATE_BOARD);

  const onClickGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({
      variables: { ...inputs },
    });
    console.log(result);
    setData(result.data.createBoard);
  };

  const onChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      작성자: <input type="text" id="writer" onChange={onChangeInputs} />
      <br />
      제목: <input type="text" id="title" onChange={onChangeInputs} />
      <br />
      내용: <input type="text" id="contents" onChange={onChangeInputs} />
      <br />
      <div>{data.number}</div>
      <div>{data._id}</div>
      <div>{data.message}</div>
      <button onClick={onClickGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </div>
  );
}
