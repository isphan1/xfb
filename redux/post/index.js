
const initialState = {
  posts: [],
  friends:[],
  fRequests:[],
  myFriends:[],
  loading:false
};

export default function posts(state = initialState, action) {
  switch (action.type) {

    case "LOADING":
      return{
        ...state,
        loading:true
      }
    case "ALL_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading:false
      };

    case "ADD_POST":
      return {
        posts: [{...action.payload},...state.posts],
      };
    case "ADD_COMMENT":
      return {
        ...state,
        posts: [
          ...state.posts.map((item) => {
            if (item.post.id === action.payload.post_id) {
              item.comments.push({
                ...action.payload.comment,
                subComments: [],
              });
            }
            return item;
          }),
        ],
      };
    case "ADD_SUB_COMMENT":
      return {
        ...state,
        posts: [
          ...state.posts.map((item) => {
            if (item.post.id === action.payload.post_id) {
              {
                item.comments.map((sub) => {
                  if (sub.id === action.payload.comment_id) {
                    sub.subComments.push({ ...action.payload.subComment });
                  }
                  return sub;
                });
              }
            }
            return item;
          }),
        ],
      };

    case "ADD_CHILD_SUB_COMMENT":
      return {
        ...state,
        posts: [
          ...state.posts.map((item) => {
            if (item.post.id === action.payload.post_id) {
              {
                item.comments.map((sub) => {
                  if (sub.id === action.payload.comment_id) {
                    sub.subComments.push({ ...action.payload.subComment });
                  }
                  return sub;
                });
              }
            }
            return item;
          }),
        ],
      };

    case "ADD_POST_REACTION":
      return {
        ...state,
        posts: [
          ...state.posts.map((item) => {
            if (item.post.id === action.payload.post_id) {
              {
                // if (item.post.reactions) {
                  item.post.reactions.map((res) => {
                    if (res.user__id === action.payload.user_id) {
                      res.type = action.payload.type;
                    }
                  });
                // }
                // item.post.reactions.push()
              }
            }
            return item;
          }),
        ],
      };

    case "ALL_FRIENDS":
      return{
        ...state,
        friends:[...action.payload]
    };
    case "MY_FRIENDS":
      return{
        ...state,
        myFriends:[...action.payload]
    };
    case "FRIENDS_REQUEST":
      return{
        ...state,
        fRequests:[...action.payload]
    };

    case "SEND_REQUEST":
      return{
        ...state,
        friends:[...state.friends.filter(item=>{
          return item.user__id !== action.payload.id
        })]
    };

    case "REMOVE_FRIEND":
      return{
        ...state,
        myFriends:[...state.myFriends.filter(item=>{
          return item.user__id !== action.payload.id
        })]
    }

    case "ACCPETED_REQUEST":
      return{
        ...state,
        fRequests:[...state.fRequests.filter(item=>{
          return item.user__id !== action.payload.id
        })],
        myFriends:[...state.myFriends,action.payload.user]
    }
    default:
      return state;
  }
}
