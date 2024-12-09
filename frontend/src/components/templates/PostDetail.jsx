import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getPost} from "@/services/user.js";
import Loader from "@/components/modules/Loader.jsx";
import {sp} from "@/services/replaceNumber.js";
import {useEffect} from "react";

function PostDetail() {
    const {id} = useParams()
    const {data , isPending , refetch} = useQuery(({queryKey:["post"] , queryFn : () => getPost(id)}))
    const post = data?.data?.post

    useEffect(()=>{
        refetch()
    },[id])


    if(isPending) return <Loader/>
    return (
        <>
            <div className="flex items-center flex-col md:flex-row gap-4 p-2">
                <div className="md:w-1/3 w-full">
                    <img className="rounded-md" src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`} alt=""/>
                </div>
                <div className="border w-full p-3 rounded-md">


                    <h2 className="font-Vazir-Bold text-3xl">{post.options.title}</h2>
                    <div className="flex my-2">
                        <img src="/location.svg" alt="loaction" className="w-5 h-5"/>
                        <p className="text-md  text-gray-700">{post.options.city}</p>
                    </div>

                    <span className="text-md  text-gray-700">{sp(post.amount)} ریال </span>
                    <div className="mt-[40px]">
                        <p>توضیحات : </p>
                        <p>{post.options.content}</p>
                    </div>
                </div>
            </div>
        </>


    );
}

export default PostDetail;