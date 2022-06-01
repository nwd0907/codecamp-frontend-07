console.log("타입스크립트를 실행했어요!!!");

import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";
import { ApolloServer, gql } from "apollo-server";

// REST: express
// GRAPHQL: ApolloServer

// 1. 타입 - typeDefs
const myTypeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Board {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [Board]
  }

  type Mutation {
    # createBoard(writer: String, title: String, contents: String): String # - 연습용(example)
    createBoard(createBoardInput: CreateBoardInput): String # - 실무용(backend07)
  }
`;

// 2. 함수(API) - resolvers
const myResolvers = {
  Query: {
    fetchBoards: async () => {
      const result = await Board.find();
      return result;
    },
  },

  Mutation: {
    createBoard: async (_: any, args: any) => {
      await Board.insert({
        ...args.createBoardInput,
        // writer: args.createBoardInput.writer,
        // title: args.createBoardInput.title,
        // contents: args.createBoardInput.contents
      });

      // 수정하면?
      // Board.update({writer: "철수"}, {title: "제목2"})

      // 삭제하면?
      // Board.delete({writer: "철수"})
      // Board.update({writer: "철수"}, {deletedAt: new Date()})

      return "게시물 등록에 성공했습니다!!";
    },
  },
};

const server = new ApolloServer({
  typeDefs: myTypeDefs,
  resolvers: myResolvers,
  cors: true,
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.124.242",
  port: 5040,
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  entities: [Board],
  synchronize: true,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("연결성공!!!");

    // 백엔드 API를 리슨(24시간동안 접속가능하게 대기상태로 만들어주기)
    server
      .listen(4000)
      .then(() => {
        console.log("서버 실행 성공!!!");
      })
      .catch(() => {
        console.log("서버 실행 실패!!!");
      });
  })
  .catch(() => {
    console.log("연결실패!!!");
  });
