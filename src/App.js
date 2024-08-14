import "./App.css";
import { LMSContentLayout, LMSCourseLayout } from "./Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ContentLayout } from "./Components/ContentLayout";
function App() {
  const ContentView = () => {
    return <LMSContentLayout />;
  };
  const LMSAdminView = () => {
    return <LMSCourseLayout />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/lms/*" element={<LMSAdminView />}></Route>
          <Route path="/content-player" element={<ContentView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
