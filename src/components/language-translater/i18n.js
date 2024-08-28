import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
 
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
      "Select Language":"भाषा चुनें",
      "Email is required": "ईमेल आवश्यक है",
      "Invalid email format": "अवैध ईमेल प्रारूप",
      "Phone number is required": "फोन नंबर आवश्यक है",
      "Invalid phone number format": "अवैध फोन नंबर प्रारूप",
      "Password is required": "पासवर्ड आवश्यक है",
      "Confirm Password is required": "पासवर्ड की पुष्टि आवश्यक है",
      "Passwords do not match": "पासवर्ड मेल नहीं खाते",
      
      //login.js

      "Login yourself": "खुद को लॉग इन करें",
      "Email ID/Phone No/Government ID": "ईमेल आईडी/फोन नंबर/सरकारी आईडी",
      "Remember Me": "मुझे याद रखें",
      "Forgot Password?": "पासवर्ड भूल गए?",
      "Signup here": "यहां साइन अप करें",
      "Don't have an account?": "खाता नहीं है?",

      //navebar.js

      "Home": "होम",
      "Circular": "सर्कुलर",
      "Help": "मदद",
      "Contact": "संपर्क",
      "Higher & Technical Education": "उच्च और तकनीकी शिक्षा",
      "Education Department": "शिक्षा विभाग",
      "Government of Uttar Pradesh": "उत्तर प्रदेश सरकार",
      "Copyright © 2024. All Rights Reserved": "स्वत्व © 2024. सर्वाधिकार सुरक्षित",

      //otp.js

      "Verification": "सत्यापन",
      "Verify Your Details": "अपना विवरण सत्यापित करें",
      "We have sent OTP to your email ID": "हमने ओ.टी.पी आपके ईमेल आईडी पर भेज दिया है",
      "We have sent OTP to your Mobile No": "हमने ओ.टी.पी आपके मोबाइल नंबर पर भेज दिया है",
      "Resend OTP": "ओ.टी.पी पुनः भेजें",
      "Verify": "सत्यापित करें",

      //forget password.js

      "Verify Account Detail": "खाता विवरण सत्यापित करें",
      "Enter your Email ID/Phone No/Government ID and we'll send you a link to reset your password": "अपना ईमेल आईडी/फोन नंबर/सरकारी आईडी दर्ज करें और हम आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे",
      "Submit": "जमा करें",
      "Already have an account ?": "पहले से एक खाता है?",
      "Reset Password Link Sent Successfully": "पासवर्ड रीसेट लिंक सफलतापूर्वक भेजा गया",
      "Check and open the link we sent to continue": "जारी रखने के लिए हम द्वारा भेजे गए लिंक को चेक और ओपन करें",


      //reset password.js

      "Reset Password": "पासवर्ड रीसेट करें",
      "Add New Password": "नया पासवर्ड जोड़ें",
      "New Password": "नया पासवर्ड",
      "Password must start with a capital letter, be at least 6 characters long, contain only lowercase letters after the first capital letter, have at least one symbol, and include at least 3 numbers": "पासवर्ड को बड़े अक्षर से शुरू होना चाहिए, कम से कम 6 अक्षर लंबा होना चाहिए, पहले बड़े अक्षर के बाद केवल छोटे अक्षर होने चाहिए, कम से कम एक प्रतीक होना चाहिए, और कम से कम 3 संख्याएँ होनी चाहिए",

      //registration.js

      "Basic Board Details":"बेसिक बोर्ड विवरण",
      "Basic Registration": "बेसिक पंजीकरण",
      "Enter your basic details as per institute establishment records.": "संस्थान स्थापना रिकॉर्ड के अनुसार अपने बुनियादी विवरण दर्ज करें।",
      "Indicates required details":"संकेत करना की आवश्यकता है विवरण",
      "Admission Type":  "प्रवेश प्रकार",
      "Student Info":  "छात्र जानकारी",
      "Upload Documents": "दस्तावेज़ अपलोड करें",
      "Current Institute Details":"वर्तमान संस्थान विवरण",
      "Finish Profile":     "प्रोफ़ाइल पूरा करें",
      "Select":"चुनें",
      "Exam Month": "परीक्षा महीना",
      "Exam Year": "परीक्षा वर्ष",
      "HSC Board": "उच्चतर माध्यमिक शिक्षा बोर्ड",
      "HSC Pass State":"उच्चतर माध्यमिक उत्तीर्ण राज्य",
      "HSC Seat No": "उच्चतर माध्यमिक सीट नंबर",
      "NEXT":"अगला पृष्ठ",
      "Registered Email ID": "पंजीकृत ईमेल आईडी",
      "Registered Phone No": "पंजीकृत फोन नंबर",
      "Form Filled":"फॉर्म भरा गया",
    

      "Personal Info": "व्यक्तिगत जानकारी",
      "Student Name": "छात्र का नाम",
      "Father Name": "पिता का नाम",
      "Gender": "लिंग",
      "Male": "पुरुष",
      "Female": "महिला",
      "Aadhar Card No": "आधार कार्ड नंबर",
      "Date Of Birth": "जन्म की तारीख",
      "Nationality": "राष्ट्रीयता",
      "Indian": "भारतीय",
      "Category": "श्रेणी",
      "Religion": "धर्म",
      "Minority": "अल्पसंख्यक",
      "Yes": "हाँ",
      "No": "नहीं",
      "Present Address(Max 255 Character)": "वर्तमान पता (अधिकतम 255 अक्षर)",
      "Permanent Address(Max 255 Character)": "स्थायी पता (अधिकतम 255 अक्षर)",
      "State": "राज्य",
      "District": "जिला",
      "Taluka": "तालुका",
      "Pincode": "पिनकोड",
      "Pancard No": "पैनकार्ड नंबर",
      "HSC Details": "एचएससी विवरण",
      "HSC School Name": "एचएससी स्कूल का नाम",
      "Obtained Marks": "प्राप्त अंक",
      "Total Marks": "कुल अंक",
      "Percentile": "प्रतिशत",
      "Additional Details": "अतिरिक्त विवरण",
      "Father Mobile Number": "पिता का मोबाइल नंबर",
      "Father Email Address": "पिता का ईमेल पता",
      "Are you living with your parents?": "क्या आप अपने माता-पिता के साथ रह रहे हैं?",
      "border-bottom border-light": "नीचे की सीमा हल्की",
      "text-primary": "प्राथमिक पाठ",
      "Back":"पिछला पृष्ठ",

      "Upload Photo": "फोटो अपलोड करें",
      "Notes : Upload Scanned Copy of Photo (File size must not exceed 02 mb)": "नोट: फोटो की स्कैन्ड कॉपी अपलोड करें (फ़ाइल का आकार 2 MB से अधिक नहीं होना चाहिए)",
      "Upload": "अपलोड करें",

      "HSC Details": "एचएससी विवरण",
      "Program Level": "कार्यक्रम स्तर",
      "Institutes": "संस्थान",
      "Program": "कार्यक्रम",
      "Enrollment No": "नामांकन संख्या",


      "lockProfile": 'प्रोफ़ाइल लॉक करें',
      "Dear":"प्रिय",
      "You have successfully completed all steps of registration.":"आपने पंजीकरण के सभी चरणों को सफलतापूर्वक पूरा किया है।",
      "Your unique registration id is":"आपका अद्वितीय पंजीकरण आईडी है",
      "noteId": 'अपनी अद्वितीय आईडी नोट करें और इसे सुरक्षित रखें, क्योंकि यह भुगतान और सभी आगामी प्रक्रियाओं के लिए उपयोग किया जाएगा।',
      "readInstructions": 'कृपया नीचे दिए गए निर्देशों को ध्यान से पढ़ें और अपनी प्रोफ़ाइल लॉक करने के लिए आगे बढ़ें।',
      "agreeLabel": 'मैं सहमत हूं और घोषित करता हूं कि पंजीकरण प्रक्रिया के चार खंडों, जैसे व्यक्तिगत विवरण, अपलोड किए गए दस्तावेज, वर्तमान संस्थान विवरण, और सेमेस्टर परिणाम विवरण, जो मैंने भरे हैं, वे सही हैं और मैं अपनी प्रोफ़ाइल को लॉक करने के बाद विवरण और नहीं बदल सकता।',
      "understandLabel1": 'मैं समझता हूं कि केवल मेरी प्रोफ़ाइल को लॉक करने के बाद ही मेरे संस्थान द्वारा मान्यता प्राप्त करने के योग्य होऊंगा, जिसे मैंने अपने संस्थान विवरण अनुभाग में उल्लेख किया है।',
      "understandLabel2": 'मैं समझता हूं कि केवल मेरे संस्थान द्वारा मेरे पंजीकरण प्रोफ़ाइल को सफलतापूर्वक मान्यता प्राप्त करने के बाद, मैं अपनी यहाँ प्रस्तुत की गई विवरणों का उल्लेख करके अनलाइन फीस भुगतान करने के लिए उपयुक्त आईडी का उपयोग कर सकूंगा।',

      "Warning": "चेतावनी",
      "You must agree to all terms before proceeding.": "आगे बढ़ने से पहले आपको सभी शर्तों से सहमत होना होगा।",
      "Are you sure?": "क्या आप निश्चित हैं?",
      "Do you want to lock your profile?": "क्या आप अपनी प्रोफ़ाइल लॉक करना चाहते हैं?",
      "Yes, save it!": "हां, इसे सहेजें!",
      "OK": "ठीक है",
      "Cancel": "रद्द करें"
     




     


    },
  },

  en: {
    translation: {
      lockProfile: 'Lock profile',
      successMessage: 'Dear {{studentName}}, You have successfully completed all steps of registration. Your unique registration id is {{registrationId}}.',
      noteId: 'Note down your unique ID and keep it safe, as it will be used for payment and all subsequent processes.',
      readInstructions: 'Please read below given instruction carefully and move further to lock your profile.',
      agreeLabel: 'I agree and declare that all the four sections of the registration process i.e. personal details, uploaded documents, current institute details, and semester result details that I have filled are correct and I will not be able to further change details after locking my profile.',
      understandLabel1: 'I understand that only after locking my profile I will be eligible to be validated by my institute which I have mentioned in my institute detail section.',
      understandLabel2: 'I understand that only after my institute successfully validates my registration profile by examining the details I have submitted here, I will be eligible to pay fees online using the unique ID generated and mentioned as above.',
      buttonLabel: 'Lock Profile',
    },
  },
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
