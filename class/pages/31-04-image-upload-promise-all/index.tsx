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
  // const [imageUrl, setImageUrl] = useState("");
  // const [file, setFile] = useState<File>();
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);

  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [callGraphql] = useMutation(CREATE_BOARD);

  const onClickGraphqlApi = async () => {
    // 1. uploadFile들을 Promise.all로 묶기
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);

    // 2. uploadFile들을 map으로 축약하기
    // const results = await Promise.all([
    //   undefined,
    //   uploadFile({ variables: { file: files[1] } }),
    //   undefined,
    // ]);
    // files.map(el => el && uploadFile({variables: {file: el}})) // [undefined, uploadFile({variables: {file: el}}), undefined]

    // 3. 최종버전
    const results = await Promise.all(
      files.map((el) => el && uploadFile({ variables: { file: el } }))
    );
    const resultUrls = results.map((el) => (el ? el.data.uploadFile.url : "")); // ["", url2, ""]

    // const result = await axios.get("https://koreanjson.com/posts/1"); // rest-api 방식
    const result = await callGraphql({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~",
          contents: "내용이에요!!!",
          images: resultUrls, // ["", url2, ""]
        },
      },
    });
    console.log(result);
  };

  const onChangeFile =
    (number: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        alert("파일이 없습니다!");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (data) => {
        if (typeof data.target?.result === "string") {
          console.log(data.target?.result);

          const tempUrls = [...imageUrls];
          tempUrls[number] = data.target?.result;
          setImageUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[number] = file;
          setFiles(tempFiles);
        }
      };
    };

  return (
    <div>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      <img src={imageUrls[0]} />
      <img src={imageUrls[1]} />
      <img src={imageUrls[2]} />
      <button onClick={onClickGraphqlApi}>GRAPHQL-API 요청하기!!!</button>
    </div>
  );
}
