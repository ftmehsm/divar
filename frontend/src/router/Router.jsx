import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import DashBoard from "@/pages/DashBoard"
import AdminPanel from "@/pages/AdminPanel"
import AuthPage from "@/pages/AuthPage"
import NotFound from "@/pages/404"
import { useQuery } from '@tanstack/react-query';
import { userProfile } from '@/services/user';
import Loader from '@/components/modules/Loader';
import PostDetail from "@/components/templates/PostDetail.jsx";

function Router() {
    const{data,isPending} = useQuery({queryKey:["userProfile"] , queryFn : userProfile})

    if(isPending) return <Loader/>

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/dashboard' element={data ? <DashBoard/> : <Navigate to={"/auth"}/>}/>
            <Route path='/admin' element={data && data.data.role === "ADMIN" ? <AdminPanel/> : <Navigate to={"/"}/>}/>
            <Route path='/auth' element={data ? <Navigate to={"/dashboard"}/> : <AuthPage/>}/>
            <Route path='/post/:id' element={<PostDetail/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default Router;