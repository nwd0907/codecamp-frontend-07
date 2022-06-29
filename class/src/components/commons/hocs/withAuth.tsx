import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import {
  accessTokenState,
  isLoadedState,
  restoreAccessTokenLoadable,
} from "../../../commons/store";

export const withAuth = (Component) => (props) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoaded, setIsLoaded] = useRecoilState(isLoadedState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  const router = useRouter();

  useEffect(() => {
    // if (!localStorage.getItem("accessToken")) {
    //   alert("로그인 후 이용 가능합니다!!!");
    //   router.push("/23-04-login-check");
    // }
    //
    //
    // [ 해결방법: 1번째 - restoreAccessToken을 두 번 요청하기!! ]
    // if (!accessToken) {
    //   getAccessToken().then((newAccessToken) => {
    //     if(newAccessToken){
    //       setAccessToken(newAccessToken);
    //     } else {
    //       alert("로그인 후 이용 가능합니다!!!");
    //       router.push("/23-04-login-check");
    //     }
    //   });
    // }
  }, []);

  // [ 해결방법: 2번째 - 로딩 활용하기 ]
  // useEffect(() => {
  //   if (isLoaded && !accessToken) {
  //     alert("로그인 후 이용 가능합니다!!!");
  //     router.push("/23-04-login-check");
  //   }
  // }, [isLoaded]);

  // [ 해결방법: 3번째 - recoil selector 활용하기 ]
  useEffect(() => {
    aaa.toPromise().then((newAccessToken) => {
      if (!newAccessToken) {
        alert("로그인 후 이용 가능합니다!!!");
        router.push("/23-04-login-check");
      }
    });
  }, []);

  return <Component {...props} />;
};
