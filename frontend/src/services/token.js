import api from "@/configs/axiosConfige";
import { getCookie } from "@/utils/cookie";

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await api.post("/auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export {getNewTokens}