// pages/EditStudent.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudentContext } from "@/context/StudentContext";
import { toast } from "sonner";
import StudentForm, { type StudentFormData } from "@/components/StudentForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, InfoIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Student } from "@/types/student";

const EditStudent = () => {
  const { id } = useParams<{ id: string }>();
  const { students, updateStudent, getStudentById } = useStudentContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (id) {
      const studentId = Number(id);
      const studentData = getStudentById(studentId);
      console.log("EditStudent - Found student:", studentData);
      if (studentData) {
        setStudent(studentData);
      }
    }
  }, [id, getStudentById]);

  const handleSubmit = async (data: StudentFormData) => {
    if (!student) return;

    console.log("EditStudent - Form data:", data);
    console.log("EditStudent - Original student:", student);

    setIsSubmitting(true);

    try {
      // Check if email already exists (excluding current student)
      const emailExists = students.some(
        (s) =>
          s.email.toLowerCase() === data.email.toLowerCase() &&
          s.id !== student.id
      );

      if (emailExists) {
        toast.error("Email already exists");
        setIsSubmitting(false);
        return;
      }

      // Create the updated student object - THIS IS THE KEY FIX
      const updatedStudent = {
        id: student.id, // KEEP THE ORIGINAL ID
        name: data.name,
        age: Number(data.age), // Ensure it's a number
        className: data.className,
        email: data.email,
      };

      console.log("EditStudent - Updated student object:", updatedStudent);

      // Call update function
      updateStudent(student.id, updatedStudent);

      toast.success("Student updated successfully");

      // Navigate immediately
      navigate("/");
    } catch (error) {
      console.error("EditStudent - Error:", error);
      toast.error("Failed to update student");
    } finally {
      setIsSubmitting(false);
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Student Not Found
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Student with ID {id} not found.
            </p>
            <Button onClick={() => navigate("/")}>
              Return to Student List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Student {student && `- ${student.name}`}
        </h1>
        <p className="text-gray-600 mt-1">Update student information</p>
      </div>

      <Alert className="bg-purple-50 border-purple-200">
        <InfoIcon className="w-4 h-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          Make your changes below.
        </AlertDescription>
      </Alert>

      {student && (
        <StudentForm
          mode="edit"
          student={student}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default EditStudent;
