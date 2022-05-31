import { Component } from "react";
import Router from "next/router";

export default class CounterPage extends Component {
  state = {
    count: 99,
  };

  componentDidMount() {
    console.log("마운트됨!!!");
    // 포커스 깜빡깜빡
  }

  componentDidUpdate() {
    console.log("수정되고 다시그려짐!!!");
  }

  componentWillUnmount() {
    console.log("컴포넌트 사라짐!!!");
    // 채팅방 나가기
    // api 요청!!!
  }

  onClickCounter = () => {
    this.setState((prev) => ({
      count: prev.count + 1,
    }));
  };

  onClickMove() {
    Router.push("/");
  }

  render() {
    return (
      <div>
        <div>현재카운트: {this.state.count}</div>
        <button onClick={this.onClickCounter}>카운트 올리기!!!</button>
        <button onClick={this.onClickMove}>나가기!!!</button>
      </div>
    );
  }
}
