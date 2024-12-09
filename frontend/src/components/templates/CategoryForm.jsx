import { createCategory } from "@/services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast,Bounce } from "react-toastify";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const { data, mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess:() => {queryClient.invalidateQueries("categories");
      toast.success(`دسته بندی با موفقیت ایجاد شد`, {
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
        setForm({ name: "", slug: "", icon: "" });
    }
  });


  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <>
      <form
        
        onSubmit={submitHandler}
        className="flex flex-col justify-start items-start font-Vazir-Medium"
      >
        <h3 className="border-b-2 border-b-Primary font-Vazir-Bold text-lg mb-4">
          دسته بندی جدید
        </h3>
        <div className="flex flex-col mb-3">
          <label htmlFor="name">اسم دسته بندی</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name} 
            className="border border-gray-300 rounded-sm mt-1 px-1 "
            onChange={changeHandler}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="slug">اسلاگ</label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={form.slug} 
            className="border border-gray-300 rounded-sm mt-1 px-1"
            onChange={changeHandler}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label htmlFor="icon">آیکون</label>
          <input
            type="text"
            name="icon"
            id="icon"
            className="border border-gray-300 rounded-sm mt-1 px-1"
            value={form.icon}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-Primary text-white rounded-md p-1 mt-5 disabled:opacity-50"
        >
          ایجاد دسته بندی
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
