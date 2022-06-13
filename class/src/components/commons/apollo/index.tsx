import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

interface IProps {
  children: ReactNode;
}
export default function ApolloSetting(props: IProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 1. 프리렌더링 예제 - process.browser 방법
  // if (process.browser) {
  //   console.log("지금은 브라우저다!!!!!");
  //   localStorage.getItem("accessToken");
  // } else {
  //   console.log("지금은 프론트엔드 서버다!!!(yarn dev 프로그램이다!!!)");
  //   localStorage.getItem("accessToken");
  // }

  // 2. 프리렌더링 예제 - typeof window 방법
  // if (typeof window !== "undefined") {
  //   console.log("지금은 브라우저다!!!!!");
  //   localStorage.getItem("accessToken");
  // } else {
  //   console.log("지금은 프론트엔드 서버다!!!(yarn dev 프로그램이다!!!)");
  //   localStorage.getItem("accessToken");
  // }

  // 3. 프리렌더링 예제 - useEffect 방법
  useEffect(() => {
    console.log("지금은 브라우저다!!!!!");
    const accessToken = localStorage.getItem("accessToken");
    setAccessToken(accessToken || "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend07.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
