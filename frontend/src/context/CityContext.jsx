import {createContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAllPosts} from "@/services/user.js";
import {useSearchParams} from "react-router-dom";

export const CityContext = createContext();

function CityProvider({children}) {
    const {data} = useQuery({queryKey:["allPosts"] , queryFn: getAllPosts });
    const[searchParams , setSearchParams] = useSearchParams()
    const [filteredPost , setFilteredPost] = useState([])

    const cityParam = searchParams.get("city");
    const categoryParam = searchParams.get("category")

    const [city , setCity] = useState(cityParam);
    const [category , setCategory] = useState(categoryParam)

    useEffect(() => {

        if(!data?.data?.posts){
            setFilteredPost([]);
            return;
        }
        let filtered = data?.data.posts

        if(city) {
            filtered = filtered.filter(post => post.options.city === city);
        }

        if(category){
            filtered = filtered.filter(post => post.category === category);
        }

        setFilteredPost(filtered)

    }, [city,data , category]);

    useEffect(()=>{

        const params = {};
        if(city) params.city = city;
        if(category) params.category = category;
        setSearchParams(params)

    },[city,category])


    return (
       <CityContext.Provider value={{filteredPost, setCity , city , category , setFilteredPost , setCategory}}>
           {children}
       </CityContext.Provider>
    );
}

export default CityProvider;