import { ChangeEvent } from "react";

export interface IBoardWriteProps {
    isEdit: boolean
    boardData?: any
  }

  export interface IMyvariables {
    number: number
    writer?: string
    title?: string
    contents?: string
  }

  export interface IBoardWriteUIProps {
    onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeContents: (event: ChangeEvent<HTMLInputElement>) => void
    onClickGraphqlApi: () => void
    onClickUpdate: () => void
    data: {
        number?: number,
        _id?: string,
        message?: string
    }
    isEdit: boolean
    boardData?: any
}

export interface IWriterInputProps {
    backgroundColor: string
}