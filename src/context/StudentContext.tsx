// context/StudentContext.tsx - FIXED VERSION
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface Student {
  id: number;
  name: string;
  age: number;
  className: string;
  email: string;
}

interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: number, updatedStudent: Student) => void;
  deleteStudent: (id: number) => void;
  getStudentById: (id: number) => Student | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem("students");
      const parsed = saved ? JSON.parse(saved) : [];
      console.log("📥 Loaded from localStorage:", parsed);
      return parsed;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever students change
  useEffect(() => {
    console.log("💾 Saving to localStorage:", students);
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Student) => {
    console.log("➕ Adding student:", student);
    setStudents((prev) => {
      const newStudents = [...prev, student];
      console.log("➕ New students array after add:", newStudents);
      return newStudents;
    });
  };

  const updateStudent = (id: number, updatedStudent: Student) => {
    console.log("✏️ Updating student ID:", id, "with:", updatedStudent);
    setStudents((prev) => {
      const newStudents = prev.map((student) =>
        student.id === id ? updatedStudent : student
      );
      console.log("✏️ New students array after update:", newStudents);
      return newStudents;
    });
  };

  const deleteStudent = (id: number) => {
    console.log("🗑️ Deleting student ID:", id);
    setStudents((prev) => {
      const newStudents = prev.filter((student) => student.id !== id);
      console.log("🗑️ New students array after delete:", newStudents);
      return newStudents;
    });
  };

  const getStudentById = (id: number) => {
    const student = students.find((student) => student.id === id);
    console.log("🔍 Getting student by ID:", id, "found:", student);
    return student;
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudentContext must be used within StudentProvider");
  return context;
};
