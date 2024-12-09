import axios from "axios";

import { getAllCategories } from "@/services/admin";
import { getCookie } from "@/utils/cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CitiesList from "@/components/modules/CitiesList.jsx";

function AddPostForm() {
  const queryClient = useQueryClient();
  const formData = new FormData();
  const { register, handleSubmit, reset } = useForm();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });


  const addPostHandler =(data) => {
    const accessToken = getCookie("accessToken");
    for (let key in data) {
      if (key === "images" && data[key]?.length) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${accessToken}`,
        },
      })
        .then((res) => {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
       queryClient.invalidateQueries({queryKey :['myPost']})
          queryClient.invalidateQueries({queryKey :["allPosts"]})

        });
    reset();
  };

  return (
    <div>
      <form
        className="grid grid-cols-2 gap-3 font-Vazir-Medium p-2"
        onSubmit={handleSubmit(addPostHandler)}
      >
        <h3 className="col-span-2  border-b-2 border-b-Primary font-Vazir-Bold text-lg mb-4">
          افزودن آگهی
        </h3>
        <div className="flex flex-col mb-3">
          <label htmlFor="title">عنوان آگهی</label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 rounded-sm mt-1 px-1 "
            {...register("title")}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="content">توضیحات</label>
          <input
            type="text"
            id="content"
            className="border border-gray-300 rounded-sm mt-1 px-1 "
            {...register("content")}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="amount">مبلغ</label>
          <input
            type="number"
            id="amount"
            className="border border-gray-300 rounded-sm mt-1 px-1 "
            {...register("amount")}
          />
        </div>
        <CitiesList register={register}/>
        <div className="flex flex-col mb-3">
          <label htmlFor="category">دسته بندی</label>
          <select
            id="category"
            className="border border-gray-300 rounded-sm mt-1 px-1"
            {...register("category")}
          >
            <option value="">...</option>
            {data?.data.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="images">عکس</label>
          <input
            type="file"
            id="images"
            className="mt-1 px-1 "
            {...register("images")}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 bg-Primary text-white rounded-md p-1  disabled:opacity-50"
        >
          ایجاد آگهی
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;
