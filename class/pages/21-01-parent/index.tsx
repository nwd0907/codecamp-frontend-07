import ChildPage from "../21-02-child";

export default function ParentPage() {
  const qqq = {
    count: 200,
  };

  //   return <ChildPage count={100} />;
  return <>{ChildPage(qqq)}</>;
}
