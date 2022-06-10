import { useForm } from "react-hook-form";

export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm();

  const onClickSubmit = (data) => {
    console.log(data);
  };

  console.log("리렌더링 체크!!");

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      {/* 주소입력: <input type="text" {...register("boardAddress.addressDetail")} /> */}
      <button>등록하기</button>
    </form>
  );
}
