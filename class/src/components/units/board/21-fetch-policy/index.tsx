import { gql, useQuery } from "@apollo/client";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function FetchPolicyTest() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <div>
      {data?.fetchBoards?.map((el) => (
        <div key={el._id}>{el.title}</div>
      ))}
    </div>
  );
}
