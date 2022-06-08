// import "../styles/globals.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import Layout from "../src/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { createUploadLink } from "apollo-upload-client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState } from "../src/commons/store";
import ApolloSetting from "../src/components/commons/apollo";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIpZgTNTkevkL8nIT6ynHi11UXIAKFMa0",
  authDomain: "codecamp-frontend-07.firebaseapp.com",
  projectId: "codecamp-frontend-07",
  storageBucket: "codecamp-frontend-07.appspot.com",
  messagingSenderId: "71811250762",
  appId: "1:71811250762:web:9278b13d0524a5f66d44b3",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default MyApp;
