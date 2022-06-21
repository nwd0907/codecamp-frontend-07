import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";

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

export default function ImageUploadPreviewPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [callGraphql] = useMutation(CREATE_BOARD);

  const onClickGraphqlApi = async () => {
    const resultFile = await uploadFile({ variables: { file } });
    const url = resultFile.data.uploadFile.url;

    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~",
          contents: "내용이에요!!!",
          images: [url],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }

    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onload = (data) => {
    //   if (typeof data.target?.result === "string") {
    //     console.log(data.target?.result);
    //     setImageUrl(data.target?.result);
    //     setFile(file);
    //   }
    // };
    const result = URL.createObjectURL(file);
    console.log(result);
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile} />
      <img src={imageUrl} />
      <button onClick={onClickGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </div>
  );
}
