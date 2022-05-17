import { useState } from "react";
import { useMutation } from '@apollo/client'
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from './BoardWrite.queries'

export default function BoardWrite() {
  const [isActive, setIsActive] = useState(false)

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

    if(event.target.value && title && contents) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)

    if(writer && event.target.value && contents) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  const onChangeContents = (event) => {
    setContents(event.target.value)

    if(writer && title && event.target.value) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  return (
    <BoardWriteUI 
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        onClickGraphqlApi={onClickGraphqlApi}
        data={data}
        isActive={isActive}
    />
  );
}
