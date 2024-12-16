
function CategoryList({selectHandler, data}) {
    return (
        <div className="md:hidden animate-slideDown">
            <div className="mt-3 space-y-2">
                <div onClick={selectHandler}
                     className=" font-Vazir-Medium rounded-md p-2  cursor-pointer hover:bg-slate-100 transition-all"
                >
                    <span className="text-gray-700 text-sm">همه ی آگهی ها</span>
                </div>
                {data.data.map((category) => (
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

export default CategoryList;