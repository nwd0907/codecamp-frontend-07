import styled from '@emotion/styled'
import { IWriterInputProps } from './BoardWrite.types'

export const WriterInput = styled.input`
    background-color: ${(props: IWriterInputProps) => props.backgroundColor};
`