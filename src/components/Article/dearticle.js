import { Comment, Avatar, Collapse } from 'antd';
const Panel = Collapse.Panel;

const Answer = ({ children, comments }) => (
  <Comment
    author={<a>{comments.nickName}</a>}
    avatar={(
      <Avatar
        src={comments.src}
        alt={"User"}
      />
    )}
    content={<span>{comments.content}</span>}
  >
    {children}
  </Comment>
)

const Answers = ({ answer }) => {
  return (
    <div>
      {answer.map((item) => {
        return <Comment author={<a>{item.nickName}</a>}
                        avatar={(
                          <Avatar
                            src={item.src}
                            alt={"User"}
                          />
                        )}
                        content={<span>{item.content}</span>}
                        key={item.id}
        />
      })}
    </div>
  )
}

const Comments = ({ commentList }) => {
  return (
    <div>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={"展开评论内容"} key={"1"}>
          {commentList.map((items) => {
            console.log(items)
              return (
                <Answer comments={items} key={items.id}>
                  {items.answers ? <Answers answer={items.answers} /> : null}
                </Answer>
              )
          })}
        </Panel>
      </Collapse>
    </div>
  )
}

export default Comments