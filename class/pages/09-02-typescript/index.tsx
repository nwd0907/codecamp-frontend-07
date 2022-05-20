export default function TypescriptPage(){
    // 타입추론
    let aaa = "안녕하세요"
    aaa = 3

    // 타입명시
    let bbb: string = "반갑습니다"

    // 문자타입
    let ccc: string
    ccc = "반가워요!!!"
    ccc = 3

    // 숫자타입
    let ddd: number = 10
    ddd = "철수"

    // 불린타입
    let eee: boolean = true
    eee = false
    eee = "false" // true로 작동함

    // 배열타입
    let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"]
    let ggg: string[] = ["철수", "영희", "훈이", 10] // 명시하지 않을시, (string | number)[] 타입으로 추론됨!!!

    // 객체타입
    interface IProfile {
        name: string
        age: number | string
        school: string
    }
    const profile: IProfile = {
        name: "철수",
        age: 8,
        school: "다람쥐초등학교"
    }
    profile.age = "8살"

    // 함수타입
    const add = (money1: number, money2: number, unit: string): string => {
        return money1 + money2 + unit
    }
    const result = add(1000, 2000, "원")

    return <div>타입스크립트 연습하기!!!</div>

}