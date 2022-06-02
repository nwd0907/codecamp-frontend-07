import { ChangeEvent, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { checkFileValidation } from "../../src/commons/libraries/fileValidation";
import { Modal } from "antd";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState();
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [callGraphql] = useMutation(CREATE_BOARD);

  const onClickGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({
      variables: {
        createBoardInput: {
          writer: writer,
          password: "1234",
          title: title,
          contents: contents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    const isValid = checkFileValidation(file);
    if (!isValid) return;

    try {
      // 1. uploadFile API 요청하기(요청 결과 URL 받아오기)
      const result = await uploadFile({ variables: { file } });
      console.log(result.data.uploadFile.url);

      // 2. 요청 결과 URL을 state에 저장하기
      setImageUrl(result.data.uploadFile.url);
    } catch (error) {
      Modal.error({ content: "에러발생!!" });
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <div>
      작성자: <input type="text" onChange={onChangeWriter} />
      <br />
      제목: <input type="text" onChange={onChangeTitle} />
      <br />
      내용: <input type="text" onChange={onChangeContents} />
      <br />
      <div>
        <h1>이미지 업로드 연습하기</h1>
        <div
          style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
          onClick={onClickImage}
        >
          이미지선택
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          onChange={onChangeFile}
          accept="image/jpeg"
        />
        <img src={`https://storage.googleapis.com/${imageUrl}`} />
      </div>
      <button onClick={onClickGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </div>
  );
}
