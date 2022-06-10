import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "@emotion/styled";
import Button01 from "../../src/components/commons/buttons/01";
import Input01 from "../../src/components/commons/inputs/01";

const Error = styled.div`
  color: red;
  font-size: 9px;
`;

const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식이 적합하지 않습니다.")
    .required("이메일은 필수 입력 사항입니다."),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리 이상 입력해 주세요.")
    .max(15, "비밀번호는 최대 15자리로 입력해 주세요.")
    .required("비밀번호는 필수 입력 사항입니다."),
  // phone: yup
  //   .string()
  //   .matches("010-0000-0000", "휴대폰 형식에 알맞지 않습니다.")
});

export default function ReactHookFormPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <Input01 type="text" register={register("email")} />
      <Error>{formState.errors.email?.message}</Error>
      비밀번호: <Input01 type="password" register={register("password")} />
      <Error>{formState.errors.password?.message}</Error>
      <Button01 isActive={formState.isValid} title="로그인하기" />
    </form>
  );
}
