import { useDispatch, useSelector } from "react-redux";
import { addFriendList } from "../utils/friendSlice";
import { useEffect } from "react";

const useGetFriends = () => {
    const dispatch = useDispatch();
    const friendList = useSelector(state => state.friends.friendList);

    const getList = async () => {
        const friends = localStorage.getItem("friends");
        const res = await fetch("http://localhost:4000/friends", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            }
        })
        const json = await res.json();
        dispatch(addFriendList(json));

        if(friends){
            localStorage.removeItem("friends");
        }
        localStorage.setItem("friends", JSON.stringify(json));
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