import axiosInstance from '../../components/axios'
import Cookie from 'js-cookie'

export const allPosts = (data) => (dispatch) => {

    dispatch({
        type:'LOADING',
      })

    axiosInstance({
        method:"post",
        url:`posts/`,
        data:data,
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
        dispatch({
            type:"ALL_POSTS",
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    })

}

export const addPost = (data) => (dispatch) =>{

    axiosInstance({
        method:"post",
        url:`addpost/`,
        data:{'id':data.id,'user_id':data.user_id,'text':data.text},
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
        dispatch({
            type:"ADD_POST",
            payload:res.data
        })

    }).catch(err=>{
        console.log(err)
    })
}

export const addComment = (data) => (dispatch) =>{

    axiosInstance({
        method:"post",
        url:`addcomment/`,
        data:data,
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
        dispatch({
            type:"ADD_COMMENT",
            payload:{
                'comment':{
                'text':data.text,
                'user_id':data.user_id,
                'profile_photo':data.profile_photo,
                'name':data.name,
                'id':data.id
                },
                'post_id':data.post_id,
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const addSubComment = (data) => (dispatch) =>{

    axiosInstance({
        method:"post",
        url:`addsubcomment/`,
        data:data,
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
        dispatch({
            type:"ADD_SUB_COMMENT",
            payload:{
                'subComment':{
                'text':data.text,
                'profile_photo':data.profile_photo,
                'name':data.name,
                'id':data.id
                },
                'post_id':data.post_id,
                'comment_id':data.comment_id
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const addChildSubComment = (data) => (dispatch) =>{

    // console.log(data)

    axiosInstance({
        method:"post",
        url:`addsubcomment/`,
        data:data,
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
        dispatch({
            type:"ADD_CHILD_SUB_COMMENT",
            payload:{
                'subComment':{
                'text':data.text,
                'profile_photo':data.profile_photo,
                'name':data.name,
                'id':data.id
                },
                'post_id':data.post_id,
                'comment_id':data.comment_id
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const addPostReaction = (data) => (dispatch) =>{

    dispatch({
        type:"ADD_POST_REACTION",
        payload:data
    })

    axiosInstance({
        method: "post",
        url: `postreaction/`,
        data:data,
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }      
      })
      .then((res) => {})
      .catch((err) => console.log(err));
}

export const allFriends = (data) => (dispatch) =>{
    axiosInstance({
        method:"post",
        url:`friends/`,
        data:{'user_id':data.user_id},
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
      dispatch({
          type:"ALL_FRIENDS",
          payload:res.data
      })
    }).catch(err=>{
        console.log(err)
    })  
}

export const friendRequests = (data) => (dispatch) =>{
    axiosInstance({
        method:"post",
        url:`friendsrequest/`,
        data:{'user_id':data.user_id},
        headers:{
            "Authorization": "JWT "+ Cookie.get("access_token")
        }
    }).then(res=>{
      dispatch({
          type:"FRIENDS_REQUEST",
          payload:res.data
      })
    }).catch(err=>{
        console.log(err)
    })  
}
export const addFriendRequest = (data) => dispatch =>{
    axiosInstance({
      method:"post",
      url:`sendrequest/`,
      data:{'sender':data.user_id,'receiver':data.id},
      headers:{
          "Authorization": "JWT "+ Cookie.get("access_token")
      }
  }).then(res=>{
    dispatch({
        type:"SEND_REQUEST",
        payload:{'id':data.id}
    })
  }).catch(err=>{
      console.log(err)
  }) 
  }

  export const accpetAddRequest = (data) => dispatch =>{
    axiosInstance({
      method:"post",
      url:`accpetrequest/`,
      data:{'sender':data.id,'receiver':data.user_id},
      headers:{
          "Authorization": "JWT "+ Cookie.get("access_token")
      }
  }).then(res=>{
    dispatch({
        type:"ACCPETED_REQUEST",
        payload:{'id':data.id,'user':data.user}
    })
  }).catch(err=>{
      console.log(err)
  }) 
  }

  export const myFriends = (data) => dispatch =>{

    axiosInstance({
      method:"post",
      url:`myfriendsrequest/`,
      data:data,
      headers:{
          "Authorization": "JWT "+ Cookie.get("access_token")
      }
  }).then(res=>{
    dispatch({
        type:"MY_FRIENDS",
        payload:res.data
    })
  }).catch(err=>{
      console.log(err)
  }) 
  }


  export const removeFriend = (data) => dispatch =>{
    axiosInstance({
      method:"post",
      url:`removefriend/`,
      data:{'id':data.id,'user_id':data.user_id},
      headers:{
          "Authorization": "JWT "+ Cookie.get("access_token")
      }
  }).then(res=>{
    dispatch({
        type:"REMOVE_FRIEND",
        payload:{'id':data.id}
    })
  }).catch(err=>{
      console.log(err)
  }) 
  }