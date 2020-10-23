import React, {Component} from 'react';
import Store from '../../../redux/store';
import Action from '../../../redux/action';
import './comment_list.css';
import MockData from './mock_commentlist';
import {Button, List} from 'antd'

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentList: []
        };
        this.initReduxStoreMockData(MockData.commentList)
    }

    /**
     * 用mock数据来初始化redux store的state
     *
     * @param mockCommentList
     */
    initReduxStoreMockData = (mockCommentList) => {
        let newState = {...mockCommentList};
        let addAction = Action.getAddCommentAction();
        for (let index in newState) {
            addAction.payload.commentList.push(newState[index])
        }
        console.log('---initReduxStoreMockData---addAction.payload. == ', addAction)
        Store.dispatch(addAction)
    };

    componentDidMount() {
        //必须先注册store.state的更新监听，否则初始化结果是拿不到的
        Store.subscribe(this.updateStateByRedux);
        this.updateStateByRedux()
    }

    /**
     * 获取redux store中的数据
     */
    updateStateByRedux = () => {
        let stateFromRedux = Store.getState();
        let newState = {...stateFromRedux};
        this.setState(newState)
    }


    /**
     * 处理列表点击事项
     * @param event
     * @param item
     */
    handleDeleteBtnClick = (event, item) => {
        const deleteAction = Action.getDeleteCommentAction();
        deleteAction.payload.index = item.index;
        Store.dispatch(deleteAction)
    }

    /**
     * 渲染单个列表项的方法
     * @param item List组件dataSource中的数据列表元素
     * @param index 当前使用的元素在datasource中的序号
     */
    renderItemFunc = (item, index) => {
        return (
            <List.Item
                className='list_item_root'
                key={index}
                extra={null}
            >
                <div className='list_item_user'>
                    {/*从左至右：用户头像 --》 姓名 --》 发布日期 --》 删除按钮*/}
                    <div style={{display: 'flex', flexDirection: "row"}}>
                        <img alt='' src={item.avatar} className='avatar'/>
                        <div className='username'>{item.userName}</div>
                    </div>
                    <div className='comment_date'>{item.date}</div>
                    <Button type="primary"
                            onClick={(e) => {
                                item.index = index;
                                this.handleDeleteBtnClick(e, item)
                            }}
                    >DELETE</Button>
                </div>
                {/*评论，插入了段前空格*/}
                <div>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + item.commentContent}</div>
            </List.Item>
        )
    }

    render() {
        const {commentList} = this.state;
        return (
            <List
                itemLayout='vertical'
                className='list'
                split
                dataSource={commentList}
                renderItem={this.renderItemFunc}
            />
        );
    }
}

export default CommentList;
