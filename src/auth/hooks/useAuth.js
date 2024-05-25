import { signup } from "../../services/authService";

const useAuth = () => {
  const handleRegister = async (data) => {
    try {
      const response = await signup(data); // try catch
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSendOtp = async (data) => {
    try {
      const response = await sendOtp(data);
      console.log("response hook", response);
      return response;
    } catch (err) {
      console.log("error", err);
    }
  };

  return { register:handleRegister, sendOtp:handleSendOtp };
};

export default useAuth;
