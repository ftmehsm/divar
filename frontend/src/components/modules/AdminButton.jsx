import { userProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { Link} from "react-router-dom";

function AdminButton() {
    const{data,isPending} = useQuery({queryKey:["userProfile"] , queryFn : userProfile});

    if(isPending) return;

    return (
        <div>
            {data && data.data.role === "ADMIN" && <Link to="/admin"  className="mr-7 bg-sky-950 text-white h-10 w-20 text-center leading-10 rounded-md p-2">پنل ادمین</Link> }
        </div>
    );
}

export default AdminButton;