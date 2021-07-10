import {SINGIN,SINGUP,LOGOUT,ERRORS,USERNAME} from './type'

const initialState = {
    username:"",
    isLogin:false,
    user:{},
    errors:{},
    loading:true,
    currentTab:"Home",
    messages:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function auth(state=initialState,action){
    switch (action.type) {
        case "LOADING":
            return{
                ...state,
                loading:true
            };
        case USERNAME:
            return{
                ...state,
                isLogin:false,
                username:action.payload.username,
                user:action.payload,
                errors:{}
            }
        case SINGIN:
            return{
                ...state,
                isLogin:true,
                username:action.payload.username,
                user:action.payload,
                errors:{},
                loading:false
            }
        case SINGUP:
            return{
                ...state,
                isLogin:true,
                username:"",
                user:action.payload,
                errors:{}
            } 
        case ERRORS:
                return{
                    ...state,
                    errors:action.payload
                }
        case "ERRORCLEAR":
                return{
                    ...state,
                    errors:{}
                }         
        case LOGOUT:
            return{
                ...state,
                isLogin:false,
                username:"",
                user:{},
                errors:{}
            }

        case "TOKENFRESH":
            return{
                ...state,
                user:action.payload,
            }
        case "CURRENT_TAB":
            return{
                ...state,
                currentTab:action.payload.tab
            }
        case "MESSAGES":
            return{
                ...state,
                messages:action.payload
            }
        case "ADD_MESSAGE":
                return{
                    ...state,
                    messages:[...state.messages,action.payload]
                }

        default:
            return state
    }
}