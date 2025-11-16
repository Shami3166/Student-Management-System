// pages/AddStudent.tsx
import { useState } from "react";
import { useStudentContext } from "@/context/StudentContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StudentForm, { type StudentFormData } from "@/components/StudentForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const AddStudent = () => {
  const { addStudent, students } = useStudentContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);

    try {
      // Check if email already exists
      const emailExists = students.some(
        (student) => student.email.toLowerCase() === data.email.toLowerCase()
      );

      if (emailExists) {
        toast.error("Email already exists", {
          description:
            "A student with this email address is already registered.",
        });
        return;
      }

      // Create new student
      const newStudent = {
        ...data,
        id: Date.now(),
      };

      addStudent(newStudent);

      toast.success("Student added successfully", {
        description: `${data.name} has been added to the student database.`,
      });

      // Navigate back to home page
      setTimeout(() => navigate("/"), 1000);
    } catch {
      toast.error("Failed to add student", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
        <p className="text-gray-600 mt-1">
          Fill in the student's information to add them to the system
        </p>
      </div>

      {/* Information Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          All fields marked with * are required.
        </AlertDescription>
      </Alert>

      {/* Student Form */}
      <StudentForm
        mode="add"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AddStudent;
