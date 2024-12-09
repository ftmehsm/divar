import { sendOtp } from "@/services/auth";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const sendHandler = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11) return;
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };

  return (
    <form
      onSubmit={sendHandler}
      className="flex flex-col max-w-[500px] m-auto mt-[100px] p-[30px] border border-silver rounded-[5px]"
    >
      <p className="text-[1.1rem] font-Vazir-Bold mt-5">ورود به حساب کاربری</p>
      <span className="text-gray-400 text-[0.9rem] mb-5">
        برای استفاده از امکانات دیوار ، لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
      className="mt-[10px] mb-5 p-[5px] border border-silver rounded-[5px]"
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button className="w-[110px] py-[5px] px-[10px] bg-Primary text-white rounded-[5px] cursor-pointer" type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
