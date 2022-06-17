import Head from "next/head";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage() {
  const requestPay = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp49910675"); // Example: imp00000000

    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: "노르웨이 회전 의자",
        amount: 100,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment",
      },
      (rsp: any) => {
        // callback
        if (rsp.success) {
          console.log(rsp);
          //   ...,
          // 결제 성공 시 로직,
          //   ...

          // 백엔드에 결제관련 데이터 넘겨주기 (=> 즉, 뮤테이션 실행하기)
          // ex, createPointTransactionOfLoading
        } else {
          //   ...,
          // 결제 실패 시 로직,
          //   ...
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  return (
    <div>
      <Head>
        {/* <!-- jQuery --> */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* <!-- iamport.payment.js --> */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
}
