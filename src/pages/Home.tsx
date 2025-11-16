// In Home.tsx - Replace your entire file with this
import { useState, useMemo, useEffect } from "react";
import { useStudentContext } from "@/context/StudentContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";
import StudentTable from "@/components/StudentTable";
import type { Student } from "@/types/student";

const Home = () => {
  const { students, deleteStudent } = useStudentContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // DEBUG: Log when students change
  useEffect(() => {
    console.log("🔄 HOME - STUDENTS UPDATED:", students);
    console.log("🔄 HOME - Students count:", students.length);
    students.forEach((student, index) => {
      console.log(`🔄 HOME - Student ${index}:`, student);
    });
  }, [students]);

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;

    const query = searchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.className.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  const handleEdit = (student: Student) => {
    console.log("Home - Editing student:", student);
    navigate(`/edit/${student.id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      deleteStudent(id);
      toast.success("Student deleted successfully");
    } catch {
      toast.error("Failed to delete student");
    }
  };

  const handleAddStudent = () => {
    navigate("/add");
  };
  const handleView = (student: Student) => {
    navigate(`/student/${student.id}`);
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Management
          </h1>
          <p className="text-gray-600 mt-1">
            Total Students: {students.length} {/* Show count directly */}
          </p>
        </div>
        <Button
          onClick={handleAddStudent}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-linear-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Total Students
            </CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {students.length}
            </div>
            <p className="text-xs text-blue-600">Registered in system</p>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Active Classes
            </CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {new Set(students.map((s) => s.className)).size}
            </div>
            <p className="text-xs text-green-600">Different classes</p>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Avg Age
            </CardTitle>
            <Users className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {students.length > 0
                ? Math.round(
                    students.reduce((acc, s) => acc + s.age, 0) /
                      students.length
                  )
                : 0}
            </div>
            <p className="text-xs text-purple-600">Years old</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Student Records ({students.length} total)</span>
          </CardTitle>
          <CardDescription>
            Search, view, and manage all student information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search by name, class, or email..."
            />
            <div className="text-sm text-gray-500">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>

          {/* No Results Alert */}
          {searchQuery && filteredStudents.length === 0 && (
            <Alert variant="default" className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                No students found matching "
                <span className="font-semibold">{searchQuery}</span>"
              </AlertDescription>
            </Alert>
          )}

          {/* Student Table */}
          <StudentTable
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView} // Add this
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
