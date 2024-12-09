import {useQuery} from "@tanstack/react-query";
import {getCities} from "@/services/user.js";

function CitiesList({register}) {
    const{data} = useQuery({queryKey: ['cities'] , queryFn : getCities})

    console.log(data?.data[0].provinces)

    return (

        <div className="flex flex-col mb-3">
            <label htmlFor="city">شهر</label>
            <select
                id="city"
                className="border border-gray-300 rounded-sm mt-1 px-1 "
                {...register("city")}
            >
                <option value="">...</option>
                {data?.data[0].provinces.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>

    );
}

export default CitiesList;