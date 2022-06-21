import { useEffect, useRef, useState } from "react";

export default function ImagePreloadPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgTag, setImgTag] = useState<HTMLImageElement>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/9/96/%22Den_kjekke_gutt%22_-_6._Internasjonale_Akademiske_Vinterleker_%281939%29_%2840200856483%29.jpg";
    img.onload = () => {
      setImgTag(img);
    };
  }, []);

  const onClickPreload = () => {
    //   document.getElementById("aaa")?.appendChild(imgTag)
    if (imgTag) divRef.current?.appendChild(imgTag);
  };

  const onClickLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      <div ref={divRef}></div>
      <button onClick={onClickPreload}>이미지 프리로드</button>
      ==========================================
      {isLoaded && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/%22Den_kjekke_gutt%22_-_6._Internasjonale_Akademiske_Vinterleker_%281939%29_%2840200856483%29.jpg" />
      )}
      <button onClick={onClickLoad}>이미지 일반로드</button>
    </div>
  );
}
