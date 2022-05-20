import { useState } from "react";
import { useMutation } from '@apollo/client'
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries'
import { useRouter } from "next/router";

export default function BoardWrite(props) {
  const router = useRouter()

  const [writer, setWriter] = useState("")
  const [title, setTitle] = useState("")
  const [contents, setContents] = useState("")

  const [data, setData] = useState({});
  const [callGraphql] = useMutation(CREATE_BOARD)
  const [updateBoard] = useMutation(UPDATE_BOARD)

  const onClickGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({ 
      variables: { writer: writer, title: title, contents: contents } 
    })
    console.log(result);
    setData(result.data.createBoard);
    router.push(`/09-01-boards/${result.data.createBoard.number}`)
  };

  const onClickUpdate = async () => {
    // const profile = {
    //   name: "철수",
    //   age: 13
    // }
    // profile.school = "다람쥐초등학교"

    const myvariables = { number: Number(router.query.number) }
    if(writer) myvariables.writer = writer
    if(title) myvariables.title = title
    if(contents) myvariables.contents = contents

    const result = await updateBoard({
      variables: myvariables
    })
    router.push(`/09-01-boards/${result.data.updateBoard.number}`)
    // router.push(`/08-05-boards/${router.query.number}`) => 이것도 가능!!
  }

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
    <BoardWriteUI 
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        onClickGraphqlApi={onClickGraphqlApi}
        onClickUpdate={onClickUpdate}
        data={data}
        isEdit={props.isEdit}
        boardData={props.boardData}
    />
  );
}
