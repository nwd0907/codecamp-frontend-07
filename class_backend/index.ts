console.log("타입스크립트를 실행했어요!!!");

import { DataSource } from "typeorm";
import { Board } from "./Board.postgres";

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
  })
  .catch(() => {
    console.log("연결실패!!!");
  });
