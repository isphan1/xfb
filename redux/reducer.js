import {combineReducers} from 'redux'
import auth from "../redux/auth"
import posts from "../redux/post"
const combinedReducer =  combineReducers({
    auth,
    posts
})

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        // clear everything but keep the stuff we want to be preserved ..
        delete state.auth;
        delete state.posts;
    }
    return combinedReducer(state, action);
}

export default rootReducer;