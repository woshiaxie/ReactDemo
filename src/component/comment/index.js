import React, {Component} from 'react';
import './index.css'
import Store from '../../redux/store';
import Action from '../../redux/action';
import CommentList from './commentl_ist/comment_list'

/**
 * 评价组件，分为两块。左侧为新评论输入区；右侧为评论列表模块
 */
class Comment extends Component {
    constructor() {
        super();
        this.state = {
            newCommentContent: "",
            newCommentUser: "",
            commentList: []
        }
    }

    handleUserNameChange = (event) => {
        this.setState({
            newCommentUser: event.target.value
        });
    }
    handleContentChange = (event) => {
        this.setState({
            newCommentContent: event.target.value
        });
    }

    sendComment = () => {
        let addCommentAction = Action.getAddCommentAction();
        let newComment = {
            "userName": this.state.newCommentUser,
            "avatar": "http://pic.whisperdiary.cn/imgs/2020/10/ef6bc6bb4bbfbd56.jpg",
            'date': new Date().toLocaleDateString(),
            "commentContent": this.state.newCommentContent,
        }
        addCommentAction.payload.commentList.push(newComment)
        Store.dispatch(addCommentAction)
        //评论更新后，清空页面组件中已输入的文字
        this.setState({
            newCommentContent: "",
            newCommentUser: "",
        });
    }

    render() {
        return (
            <div className='comment_root'>
                {/*输入评论区*/}
                <div className='comment_user_root'>
                    <h4 style={{width: '100%', margin: '10px'}}>User Name</h4>
                    <input style={{width: '90%', margin: '10px'}} type='text'
                           value={this.state.newCommentUser}
                           onChange={this.handleUserNameChange}/>
                    <h4 style={{width: '100%', marginLeft: '1rem', margin: '10px'}}>Comment</h4>
                    <textarea style={{width: '90%', marginLeft: '10px'}} cols="8" rows="20"
                              value={this.state.newCommentContent}
                              onChange={this.handleContentChange}/>

                    <button style={{width: '50%', marginLeft: '1rem', marginTop: '5px', alignSelf: 'center'}}
                            onClick={this.sendComment}>发送评论
                    </button>
                </div>
                <div style={{
                    width: '46%',
                    height: '30rem',
                    marginRight: '1rem',
                    border: 'solid 1px darkgrey',
                    borderRadius: '10px'
                }}>
                    <div className='comment_list_title'>评论</div>
                    <CommentList className='comment_list_root'/>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {};

export default Comment;
