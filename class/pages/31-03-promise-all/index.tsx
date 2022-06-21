export default function PromiseAllPage() {
  const onClickPromise = async () => {
    console.time("시작!!!");
    const result1 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog1.jpg");
      }, 3000);
    });

    const result2 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog2.jpg");
      }, 2000);
    });

    const result3 = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("https://dog3.jpg");
      }, 1000);
    });
    console.timeEnd("시작!!!");

    // 게시글등록
    // createBoard({
    //      variables: { ..., images: [result1, result2, result3]}
    // })
  };

  const onClickPromiseAll = async () => {
    console.time("시작!!!");
    const result = await Promise.all([
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("https://dog1.jpg");
        }, 3000);
      }),

      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("https://dog2.jpg");
        }, 2000);
      }),

      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("https://dog3.jpg");
        }, 1000);
      }),
    ]);
    console.timeEnd("시작!!!");

    console.log(result);

    // 게시글등록
    // createBoard({
    //      variables: { ..., images: [result1, result2, result3]}
    // })
  };

  return (
    <div>
      <button onClick={onClickPromise}>Promise 연습하기!!</button>
      <button onClick={onClickPromiseAll}>Promise.all 연습하기!!</button>
    </div>
  );
}
