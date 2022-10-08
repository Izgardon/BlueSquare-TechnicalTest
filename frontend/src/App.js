import { Routes, Route } from "react-router-dom";

import { LoginPage, DataPage, PageNotFound } from "./Pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employees" element={<DataPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
