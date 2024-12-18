import ICommentResponse from './ICommentResponse';

export default interface IComment extends Pick<ICommentResponse, 'comment'> {
}