import { getAllCategories } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import {useContext} from "react";
import {CityContext} from "@/context/CityContext.jsx";


function Categories() {
    const { setCategory  } = useContext(CityContext);
    const { data, isPending } = useQuery({queryKey: ["categories"], queryFn: getAllCategories,});


    const selectHandler= (event) => {
        const selected = event.target.innerText;
        if(data && selected !== "همه ی آگهی ها") {
         const categoryId = data.data.find(item => item.name === selected)._id
           setCategory(categoryId)
        }else if(selected === "همه ی آگهی ها"){
            setCategory("")
        }

    }

    if (isPending) return;

    return (
    <div className="w-full md:w-[40%] col-span-1">
      <h3 className="inline-block border-b-2 border-b-Primary font-Vazir-medium text-lg">
        دسته‌بندی‌ها
      </h3>
        <div className="mt-3 space-y-2">
            <div onClick={selectHandler}
                 className=" font-Vazir-Medium rounded-md p-2  cursor-pointer hover:bg-slate-100 transition-all"
            >
                <span className="text-gray-700 text-sm">همه ی آگهی ها</span>
            </div>
            {data?.data.map((category) => (
                <div onClick={selectHandler}
                     className="flex items-center gap-2 text-center font-Vazir-Medium py-2 rounded-md leading-10 cursor-pointer hover:bg-slate-100 transition-all"
                     key={category._id}
                >
                    <img
                        className="w-7 h-7 object-contain"
                        src={`${category.icon}.svg`}
                        alt={category.name}
                    />
                    <span className="text-gray-700 text-sm">{category.name}</span>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Categories;
