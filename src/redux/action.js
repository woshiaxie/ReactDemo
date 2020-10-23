/**
 * Redux使用第三步：创建一个事件生成类，这里我没有使用工厂方法，因为DEMO中涉及的事件比较单一。
 */
class Action {
    static getDeleteCommentAction = () => {
        return {
            type: "DELETE",
            payload: {
                index: 0
            }
        }
    };


    /**
     *  payload.commentList是一个数组，里面全是如下对象.
     *  {
     *     "userName": "",
     *     "avatar": "http://pic.whisperdiary.cn/imgs/2020/10/ef6bc6bb4bbfbd56.jpg",
     *     'date': '',
     *     "commentContent": "",
     *  }
     */


    static getAddCommentAction = () => {
        return {
            type: "ADD",
            payload: {
                commentList: []
            }
        }
    }
}


export default Action;
