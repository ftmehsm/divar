import AdminButton from "@/components/modules/AdminButton";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Link, useNavigate,} from "react-router-dom";
import {userProfile} from "@/services/user.js";
import CitySelect from "@/components/modules/CitySelect.jsx";

function Header() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen , setIsMenuOpen] = useState(false);
  const{data,isPending} = useQuery({queryKey:["userProfile"] , queryFn : userProfile});



  document.body.addEventListener("click" , () => {
      setIsDropdownOpen(false)
  })

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const exitHandler = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    queryClient.invalidateQueries({queryKey : ['userProfile']});
    setIsDropdownOpen(false); // بستن منو
  }

  const clickHandler = () => {
    navigate("auth/")
  }

  const menuOpener = () => {
      setIsMenuOpen((prev) => !prev)
  }

  if(isPending) return;

  return (
    <>
        <nav className="flex relative justify-between items-center px-3 py-[10px] mb-5 border-b-2 border-b-[rgb(234,234,234)]">
            {isMenuOpen && <div className="absolute md:hidden top-[60px] right-0 text-center w-full bg-slate-50 shadow animate-slideDown ">
                <ul className="flex flex-col items-center  gap-3 p-3 ">
                    <Link to="auth/"  onClick={() => setIsMenuOpen(false)}>پنل کاربری</Link>
                    {data && data.data.role === "ADMIN" && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>پنل ادمین</Link>}
                </ul>
            </div>}
            <button onClick={menuOpener} className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
            </button>
            <div className="flex items-center ">
                <Link to="/" className="w-[45px] h-[40px]">
                    <img src="/divar.svg" alt="divar-logo" className="w-full h-full"/>
                </Link>
                <CitySelect/>
            </div>
            <div className="items-center hidden md:flex">
                    <a className="relative flex items-center">
                        <div
                            className="flex items-center gap-2 h-10 leading-[50px] text-gray-500  hover:bg-gray-200 rounded-md px-2 cursor-pointer"
                            onClick={clickHandler}>
                            <img src="/profile.svg" alt="" className="w-5 h-5"/>
                            <span>دیوار من</span>
                            <div className="cursor-pointer" onClick={toggleDropdown}>
                                {data && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>}
                            </div>
                        </div>
                        {isDropdownOpen && (
                            <div
                                onClick={exitHandler}
                                className="absolute top-9 left-0 w-full bg-slate-100 text-center rounded-md h-10 leading-10 shadow-md cursor-pointer"
                            >
                                خروج
                            </div>
                        )}
                    </a>
                    <Link to="/dashboard"
                          className="mr-7 bg-Primary text-white h-10 w-20 text-center leading-10 rounded-md">ثبت
                        آگهی</Link>
                    <AdminButton/>
                </div>
        </nav>
    </>
  );
}

export default Header;
