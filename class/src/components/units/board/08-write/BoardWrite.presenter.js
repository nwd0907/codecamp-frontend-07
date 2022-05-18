import * as S from './BoardWrite.styles'

export default function BoardWriteUI(props){
    return (
        <div>
            {/* {props.aaa === "사과" && (<h1>사과페이지</h1>)}
            {props.aaa === "바나나" && (<h1>바나나페이지</h1>)}
            {props.aaa === "딸기" && (<h1>딸기페이지</h1>)} */}
            작성자: <S.WriterInput type="text" onChange={props.onChangeWriter} /><br />
            제목: <input type="text" onChange={props.onChangeTitle} /><br />
            내용: <input type="text" onChange={props.onChangeContents} /><br />
            <div>{props.data?.number}</div>
            <div>{props.data?._id}</div>
            <div>{props.data?.message}</div>
            <button onClick={props.isEdit ? props.onClickUpdate : props.onClickGraphqlApi}>
                {props.isEdit ? "수정하기" : "등록하기"}
            </button>
        </div>
    )
}