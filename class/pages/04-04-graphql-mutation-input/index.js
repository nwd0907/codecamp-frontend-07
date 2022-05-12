import { useState } from "react";
import { gql, useMutation } from '@apollo/client'

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String){
    createBoard(writer: $writer, title: $title, contents: $contents){
      _id
      number
      message
    }
  }
`

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState("")
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")

  const [data, setData] = useState({});
  const [callGraphql] = useMutation(CREATE_BOARD)

  const onClickGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({ 
      variables: { writer: writer, title: title, contents: contents } 
    })
    console.log(result);
    setData(result.data.createBoard);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value)
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeContents = (event) => {
    setContents(event.target.value)
  }

  return (
    <div>
      작성자: <input type="text" onChange={onChangeWriter} /><br />
      제목: <input type="text" onChange={onChangeTitle} /><br />
      내용: <input type="text" onChange={onChangeContents} /><br />
      <div>{data.number}</div>
      <div>{data._id}</div>
      <div>{data.message}</div>
      <button onClick={onClickGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </div>
  );
}
