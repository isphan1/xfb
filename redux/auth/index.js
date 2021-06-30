import {SINGIN,SINGUP,LOGOUT,ERRORS,USERNAME} from './type'

const initialState = {
    username:"",
    option:"",
    isLogin:false,
    user:{},
    errors:{}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function auth(state=initialState,action){
    switch (action.type) {
        case USERNAME:
            return{
                ...state,
                isLogin:false,
                username:action.payload.username,
                option:action.payload.option,
                user:{},
                errors:{}
            }
        case SINGIN:
            return{
                ...state,
                isLogin:true,
                username:action.payload,
                user:"",
                errors:{}
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

        default:
            return state
    }
}