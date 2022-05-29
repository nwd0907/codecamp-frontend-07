import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardCommentWriteProps {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  el?: any;
}

export interface IBoardCommentWriteUIProps {
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickWrite: () => void;
  onClickUpdate: () => void;
  isEdit?: boolean;
  el?: any;
  contents: string;
  setStar: Dispatch<SetStateAction<number>>;
}

export interface IUpdateBoardCommentInput {
  contents?: string;
  rating?: number;
}
