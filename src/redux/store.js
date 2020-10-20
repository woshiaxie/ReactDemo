import {createStore} from 'redux';
import Reducer from "./reducer";

/**
 * Redux使用第二步：创建一个Store。
 *
 * @type {*}
 */
const Store = createStore(Reducer);
export default Store;
