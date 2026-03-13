
interface IComment{
    postId:string,
    comments:{commentId:string,comment:string}[] 
}

export const comments:IComment[] = [];