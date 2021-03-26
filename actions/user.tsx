import * as firebase from 'firebase'
import db from '../config/firebase'
import { orderBy } from 'lodash'
import { FC } from 'react'


export const updateEmail = (input: any) => {
    return { type:'UPDATE_EMAIL', payload: input }
}

export const updatePassword = (input: any) => {
    return { type:'UPDATE_PASSWORD', payload: input }
}

export const updateUsername = (input: any) => {
    return { type:'UPDATE_USERNAME', payload: input }
}



export const signup = () => {
    return async (dispatch , getState) => {
        try{
            const { username, email, password } = getState().user
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)

            if(response.user?.uid) {
                const user = {
                    uid:response.user.uid,
                    username:username,
                    email:email,
                    posts:[],
                    bio:"",
                    likes:0,
                    photo:""
                }
                await db
                 .collection('users')
                 .doc(response.user.uid)
                 .set(user)
                 dispatch({type:'LOGIN', payload:user})
                 alert('User has been signed up!')
            }

        }catch(e){
            alert(e)
        }
    }

}


export const login = () => {
    return async (dispatch: (arg0: (dispatch: any) => Promise<void>) => void, getState: () => { (): any; new(): any; user: { email: any; password: any } }) => {
        try {
            const { email, password } = getState().user
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))
            
        }catch(e) {
            alert(e)
        }
    }
}


export const getUser = (uid) => {
    return async (dispatch) => {
        try {
            const userQuery = await db
                                    .collection('users')
                                    .doc(uid)
                                    .get()
            let user = userQuery.data()

            let posts = []
            const postQuery = await db.collection('posts').where('uid','==',uid).get()
            postQuery.forEach(function(response){
                posts.push(response.data())
            })

            user.posts = orderBy(posts, 'date','desc')

            dispatch({type:'LOGIN', payload:user})
        }catch(e){
            alert(e)
        }
    }
}