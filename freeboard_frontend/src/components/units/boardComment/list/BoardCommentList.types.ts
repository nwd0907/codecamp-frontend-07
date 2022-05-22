import { MouseEvent } from "react";

export interface IBoardCommentListUIProps {
  data?: any;
  onClickDelete: (event: MouseEvent<HTMLImageElement>) => void;
}
