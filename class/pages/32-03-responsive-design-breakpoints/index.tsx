import styled from "@emotion/styled";
import { breakPoints } from "../../src/commons/styles/media";

const Wrapper = styled.div`
  width: 62.5rem; // em vs rem // 1000px
  height: 1000px;
  background-color: red;

  @media ${breakPoints.tablet} {
    width: 500px;
    height: 500px;
    background-color: green;
  }

  @media ${breakPoints.mobile} {
    width: 100px;
    height: 100px;
    background-color: blue;
    display: none;
  }
`;

const MWrapper = styled.button`
  display: none;

  @media ${breakPoints.mobile} {
    width: 300px;
    height: 100px;
    background-color: blue;
    display: block;
  }
`;

export default function ResponsiveDesignPage() {
  return (
    <div>
      <MWrapper>모바일에만 필요한 컴포넌트!!!</MWrapper>
      <Wrapper>상자</Wrapper>
    </div>
  );
}
