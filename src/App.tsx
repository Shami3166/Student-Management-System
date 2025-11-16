import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "@/context/StudentContext";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import AddStudent from "@/pages/AddStudent";
import EditStudent from "@/pages/EditStudent";
import StudentDetail from "@/pages/StudentDetail";

function App() {
  return (
    <StudentProvider>
      <Router>
        <Navbar />
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
            <Route path="/student/:id" element={<StudentDetail />} />
          </Routes>
        </main>
      </Router>
    </StudentProvider>
  );
}

export default App;
