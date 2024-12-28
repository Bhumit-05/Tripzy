import { useDispatch, useSelector } from "react-redux";
import { addFriendList } from "../utils/friendSlice";
import { useEffect } from "react";

const useGetFriends = () => {
    const dispatch = useDispatch();
    const friendList = useSelector(state => state.friends.friendList);

    const getList = async () => {
        const res = await fetch("http://localhost:4000/friends", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            }
        })
        console.log("fetching")
        const json = await res.json();
        dispatch(addFriendList(json));
    }    

    // Reducing API calls
    useEffect(() => {
        if(friendList.length===0){
            getList();
        }
    }, [friendList.length])

    return getList;
}

export default useGetFriends;