import { checkOtp } from "@/services/auth";
import { setCookie } from "@/utils/cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "@/services/user";

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const { refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userProfile,
  });
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(mobile, code);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col max-w-[500px] m-auto mt-[100px] p-[30px] border border-silver rounded-[5px]"
    >
      <p className="text-[1.1rem] font-Vazir-Bold mt-5">تایید کد ارسالی</p>
      <span className="text-gray-400 text-[0.9rem] mb-5">
        کد پیامک شده به شماره «{mobile}» را وارد کنید
      </span>
      <label htmlFor="input">کد ارسالی</label>
      <input
      className="mt-[10px] mb-5 p-[5px] border border-silver rounded-[5px]"
        type="text"
        placeholder="کد ارسالی"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="w-[110px] py-[5px] px-[10px] bg-Primary text-white rounded-[5px] cursor-pointer"
        type="submit"
      >
        تایید
      </button>
      <button className="bg-white text-Primary border border-Primary w-[150px] mt-[30px] p-1 rounded-sm" onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOtpForm;
