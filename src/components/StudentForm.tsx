// components/StudentForm.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Student } from "@/context/StudentContext";
import { ArrowLeft, Save, UserPlus, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Form data interface
export interface StudentFormData {
  name: string;
  age: number;
  className: string;
  email: string;
}

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: StudentFormData) => void;
  isSubmitting?: boolean;
  mode: "add" | "edit";
}

const StudentForm = ({
  student,
  onSubmit,
  isSubmitting = false,
  mode,
}: StudentFormProps) => {
  const navigate = useNavigate();

  // Initialize form with simple validation
  const form = useForm<StudentFormData>({
    defaultValues: {
      name: student?.name || "",
      age: student?.age || 16,
      className: student?.className || "",
      email: student?.email || "",
    },
  });

  const classOptions = [
    "Grade 10",
    "Grade 11",
    "Grade 12",
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
  ];

  // Custom validation function
  const validateForm = (data: StudentFormData): boolean => {
    if (!data.name || data.name.length < 2) {
      form.setError("name", { message: "Name must be at least 2 characters" });
      return false;
    }

    if (!data.age || data.age < 5 || data.age > 25) {
      form.setError("age", { message: "Age must be between 5 and 25" });
      return false;
    }

    if (!data.className) {
      form.setError("className", { message: "Please select a class" });
      return false;
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      form.setError("email", { message: "Please enter a valid email address" });
      return false;
    }

    return true;
  };

  const handleFormSubmit = (data: StudentFormData) => {
    if (validateForm(data)) {
      onSubmit(data);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-linear-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            {mode === "add" ? (
              <UserPlus className="w-5 h-5 text-blue-600" />
            ) : (
              <UserCog className="w-5 h-5 text-purple-600" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl">
              {mode === "add" ? "Add New Student" : "Edit Student"}
            </CardTitle>
            <CardDescription>
              {mode === "add"
                ? "Enter the student's information to add them to the system"
                : "Update the student's information"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter student's full name"
                      {...field}
                      className="h-11 text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the student's legal name (minimum 2 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Age *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      className="h-11 text-base"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Student must be between 5 and 25 years old
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Class Field */}
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Class/Grade *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 text-base">
                        <SelectValue placeholder="Select class or grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classOptions.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the appropriate class or grade level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="student@example.com"
                      {...field}
                      className="h-11 text-base"
                    />
                  </FormControl>
                  <FormDescription>
                    This email will be used for communication
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-11 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {mode === "add"
                      ? "Adding Student..."
                      : "Updating Student..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {mode === "add" ? "Add Student" : "Update Student"}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="h-11 text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
