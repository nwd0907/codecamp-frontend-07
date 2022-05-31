import { Component, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

export default function CounterPage() {
  const router = useRouter();
  const [count, setCount] = useState(99);

  // componentDidMount() {
  //   console.log("마운트됨!!!");
  //   // 포커스 깜빡깜빡
  // }

  // componentDidUpdate() {
  //   console.log("수정되고 다시그려짐!!!");
  // }

  // componentWillUnmount() {
  //   console.log("컴포넌트 사라짐!!!");
  //   // 채팅방 나가기
  //   // api 요청!!!
  // }

  useEffect(() => {
    console.log("마운트됨!!!");
    // 포커스 깜빡깜빡
  }, []);

  useEffect(() => {
    console.log("수정되고 다시그려짐!!!");
  });

  useEffect(() => {
    return () => {
      console.log("컴포넌트 사라짐!!!");
      // 채팅방 나가기
      // api 요청!!!
    };
  }, []);

  // 1. 하나로 합치기 가능
  // useEffect(() => {
  //   console.log("마운트됨!!!");
  //   // 포커스 깜빡깜빡

  //   return () => {
  //     console.log("컴포넌트 사라짐!!!");
  //     // 채팅방 나가기
  //     // api 요청!!!
  //   };
  // }, []);

  // // 2. useEffect의 잘못된 사용 예제(1. 추가렌더링, 2. 무한루프)
  // useEffect(() => {
  //   setCount((prev) => prev + 1);
  // }, [count]);

  const onClickCounter = () => {
    setCount((prev) => prev + 1);
  };

  const onClickMove = () => {
    router.push("/");
  };

  console.log("나는 언제 실행되게?!");

  return (
    <div>
      <div>현재카운트: {count}</div>
      <button onClick={onClickCounter}>카운트 올리기!!!</button>
      <button onClick={onClickMove}>나가기!!!</button>
    </div>
  );
}
