// pages/StudentDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudentContext } from "@/context/StudentContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  User,
  Calendar,
  BookOpen,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import type { Student } from "@/types/student";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getStudentById, deleteStudent } = useStudentContext();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const studentId = Number(id);
      const studentData = getStudentById(studentId);
      if (studentData) {
        setStudent(studentData);
      }
    }
  }, [id, getStudentById]);

  const handleDelete = async () => {
    if (!student) return;

    if (
      !confirm(
        `Are you sure you want to delete ${student.name}? This action cannot be undone.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      deleteStudent(student.id);
      toast.success("Student deleted successfully", {
        description: `${student.name} has been removed from the system.`,
      });
      navigate("/");
    } catch {
      toast.error("Failed to delete student");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (student) {
      navigate(`/edit/${student.id}`);
    }
  };

  // Student not found
  if (!student && id) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-16 h-16 text-red-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Student Not Found
            </h2>
            <p className="text-gray-600 text-center mb-6">
              The student you're looking for doesn't exist or may have been
              deleted.
            </p>
            <Button onClick={() => navigate("/")}>
              Return to Student List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Details
            </h1>
            <p className="text-gray-600 mt-1">
              Complete information about {student.name}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Student
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            {isDeleting ? "Deleting..." : "Delete Student"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Student Info Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    {student.name}
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Student ID: {student.id}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-900">
                      {student.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold text-gray-900">
                      {student.age} years old
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Class/Grade</p>
                    <p className="font-semibold text-gray-900">
                      {student.className}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-gray-900 break-all">
                      {student.email}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Manage this student's information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="h-14 justify-start"
                >
                  <Edit className="w-4 h-4 mr-3 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">Edit Profile</p>
                    <p className="text-xs text-gray-500">
                      Update student information
                    </p>
                  </div>
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="h-14 justify-start"
                >
                  <User className="w-4 h-4 mr-3 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">View All Students</p>
                    <p className="text-xs text-gray-500">
                      Back to student list
                    </p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Student Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Enrollment Status</span>
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-100"
                >
                  Active
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Record Created</span>
                <Badge variant="outline">
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Updated</span>
                <Badge variant="outline">
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Class Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Class Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {student.className}
                </div>
                <p className="text-sm text-purple-700">Current Grade/Class</p>
              </div>
            </CardContent>
          </Card>

          {/* Age Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Age Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {student.age}
                </div>
                <p className="text-sm text-orange-700">Years Old</p>
                <Badge variant="outline" className="mt-2 bg-white">
                  {student.age >= 18 ? "Adult" : "Minor"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Important Notice */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          This student record is stored locally in your browser. For permanent
          storage, consider implementing a backend database.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default StudentDetail;
