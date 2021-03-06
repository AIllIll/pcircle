import { Comment, Avatar, Collapse, Button } from 'antd';
import {deleteCommentInfoAction} from "../../models/main/deletecomment";
const Panel = Collapse.Panel;

const Answer = ({ children, comments }) => (
  <Comment
    author={<a>{comments.nickName}</a>}
    avatar={(
      <Avatar
        src={comments.avatarUrl}
        alt={"User"}
      />
    )}
    content={<span>{comments.content}</span>}
  >
    {children}
  </Comment>
)

// const Answers = ({ answer }) => {
//   return (
//     <div>
//       {answer.map((item) => {
//         return <Comment author={<a>{item.nickName}</a>}
//                         avatar={(
//                           <Avatar
//                             src={item.src}
//                             alt={"User"}
//                           />
//                         )}
//                         content={<span>{item.content}</span>}
//                         key={item.id}
//         />
//       })}
//     </div>
//   )
// }


const Comments = ({ commentList, dispatch }) => {
  const handleDelete = (id) => {
    console.log(id)
    dispatch(deleteCommentInfoAction(id))
  }

  return (
    <div>
      <Collapse bordered={false}>
        <Panel header={"展开评论内容"} key={"1"}>
          {commentList.map((items) => {
            // console.log(items)
              return (
                <Answer comments={items} key={items._id.$oid}>
                  {/*{items.answers ? <Answers answer={items.answers} /> : null}*/}
                  <Button type="primary" onClick={handleDelete.bind(this, items._id.$oid)}>评论删除</Button>
                </Answer>
              )
          })}
        </Panel>
      </Collapse>
    </div>
  )
}

export default Comments
