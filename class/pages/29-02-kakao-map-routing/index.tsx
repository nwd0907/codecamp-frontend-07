import { useRouter } from "next/router";
import Link from "next/link";

export default function KakaoMapPage() {
  const router = useRouter();

  const onClickMoveToMap = () => {
    router.push("/29-03-kakao-map-routed");
  };

  return (
    // <button onClick={onClickMoveToMap}>맵으로 이동하기!!</button>
    // <h1>물건 팝니다</h1>
    // <div>정말 좋은 마우스이에요!!</div>
    <Link href="/29-03-kakao-map-routed">
      <a>맵으로 이동하기!!</a>
    </Link>
    // <button>
    //   <a href="/29-03-kakao-map-routed">맵으로 이동하기!!</a>
    // </button>
  );
}
