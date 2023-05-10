export interface IMessage {
  message: string;
}

export interface ICommentResponse<T> extends IMessage {
  data: T;
}
