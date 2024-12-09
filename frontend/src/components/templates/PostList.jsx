import { getMyPost } from "@/services/user";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../modules/Loader";
import { sp } from "@/services/replaceNumber";
import { getCookie } from "@/utils/cookie";
import axios from "axios";


function PostList() {
  const url = import.meta.env.VITE_BASE_URL;
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["myPost"],
    queryFn: getMyPost,
  });

  console.log(data?.data.posts)

  
  const deleteHandler = (id) => {
    const accessToken = getCookie("accessToken")
    axios.delete(`${url}/post/delete/${id}` , {headers:{
      Authorization : `bearer ${accessToken}`
    }}).then(() => queryClient.invalidateQueries({ queryKey: ['myPost'] }))
  }
  return (
    <div>
      <h3 className="my-6 font-Vazir-Bold text-xl">آگهی های شما</h3>
      {isPending && <Loader/>}
      <div>
        {data?.data.posts.length==0 && <p>هنوز آگهی ایجاد نکردید!</p>}
        {data?.data.posts.map((post) => (
          
          <div className="flex items-center justify-between bg-slate-50 p-3 m-2 rounded-md shadow-sm cursor-pointer" key={post._id}>
          <div className="flex items-center gap-3" >
            <button className="hover:bg-Primary p-2 rounded-md hover:text-white" onClick={()=> deleteHandler(post._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
               </svg>
            </button>
          <img src={`${url}/${post.images[0]}`} className="w-[100px] rounded-md" alt={post._id} />
          <div className="flex flex-col ">
          <span className="font-Vazir-Medium">{post.options.title}</span>
          <span>{post.options.content}</span>
          </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-Vazir-Medium">{sp(post.amount)}</span>
            <span>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</span>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
