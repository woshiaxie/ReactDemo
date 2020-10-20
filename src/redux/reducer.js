/**
 * Redux使用第一步：创建一个Redux事件消费类。这个消费类在创建Store的时候会被传入。
 * @param state 事件发出时Store中的state
 * @param action 发出的时间
 * @returns {{}|any} 处理后的state
 */
const reducer = (state, action) => {
    console.log('-------------> in reducer， state === ', state)
    if (!action) {
        console.error('action === undefined')
        return state;
    }

    if (!state) {
        state = {}
    }

    switch (action.type) {
        case 'DELETE': {
            let newState = JSON.parse(JSON.stringify(state));
            newState.commentList.splice(action.payload.index, 1)
            console.log('-----------> deleted: index === ' + action.payload.index);
            return newState;
        }
        case 'ADD': {
            let newState = JSON.parse(JSON.stringify(state));
            if (!newState.commentList) {
                newState.commentList = [];
            }
            newState.commentList.unshift(...action.payload.commentList);
            return newState;
        }
        default:
            return state;
    }
}
export default reducer;
