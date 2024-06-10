import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {

      //signup.js

      "Register": "Register",
      "Create an Account": "Create an Account",
      "Email ID": "Email ID",
      "Phone No": "Phone No",
      "Password": "Password",
      "Confirm Password": "Confirm Password",
      "Signup": "Signup",
      "Already have an account?": "Already have an account?",
      "Login": "Login",

      //login.js

      "Login": "Login",
      "Logout":"Logout",
      "Login yourself": "Login yourself",
      "Email ID/Phone No/Government ID": "Email ID/Phone No/Government ID",
      "Password": "Password",
      "Remember Me": "Remember Me",
      "Forgot Password?": "Forgot Password?",
      "Signup here": "Signup here",
      "Don't have an account?": "Don't have an account?",

      //navbar.js

      "Home": "Home",
      "Circular": "Circular",
      "Help": "Help",
      "Contact": "Contact",
      "Higher & Technical Education": "Higher & Technical Education",
      "Education Department": "Education Department",
      "Government of Uttar Pradesh": "Government of Uttar Pradesh",
      "Copyright © 2024. All Rights Reserved": "Copyright © 2024. All Rights Reserved",

    }
  },
  hi: {
    translation: {
      
      //signup.js

      "Register": "रजिस्टर करें",
      "Create an Account": "खाता बनाएँ",
      "Email ID": "ईमेल आईडी",
      "Phone No": "फोन नंबर",
      "Password": "पासवर्ड",
      "Confirm Password": "पासवर्ड की पुष्टि करें",
      "Signup": "साइन अप करें",
      "Already have an account?": "पहले से ही एक खाता है?",
      "Login": "लॉग इन करें",
      "Logout":"लॉगआउट",
      
      //login.js

      "Login yourself": "खुद को लॉग इन करें",
      "Email ID/Phone No/Government ID": "ईमेल आईडी/फोन नंबर/सरकारी आईडी",
      "Password": "पासवर्ड",
      "Remember Me": "मुझे याद रखें",
      "Forgot Password?": "पासवर्ड भूल गए?",
      "Signup here": "यहां साइन अप करें",
      "Don't have an account?": "खाता नहीं है?",

      //navebar.js

      "Home": "होम",
      "Circular": "सर्कुलर",
      "Help": "मदद",
      "Contact": "संपर्क",
      "Signup": "साइन अप करें",
      "Login": "लॉगिन",
      "Higher & Technical Education": "उच्च और तकनीकी शिक्षा",
      "Education Department": "शिक्षा विभाग",
      "Government of Uttar Pradesh": "उत्तर प्रदेश सरकार",
      "Copyright © 2024. All Rights Reserved": "स्वत्व © 2024. सर्वाधिकार सुरक्षित",
      "Education Department": "शिक्षा विभाग",
      "Government of Uttar Pradesh": "उत्तर प्रदेश सरकार"


    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('selectedLanguage') || 'en', // Load the selected language from local storage, default to English if not set
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
