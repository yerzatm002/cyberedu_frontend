import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import NotFoundPage from '@/pages/NotFoundPage'
import StudentDashboardPage from '@/pages/student/StudentDashboardPage'
import StudentLessonsPage from '@/pages/student/StudentLessonsPage'
import StudentLessonDetailPage from '@/pages/student/StudentLessonDetailPage'
import StudentTaskPage from '@/pages/student/StudentTaskPage'
import StudentQuizPage from '@/pages/student/StudentQuizPage'
import StudentProfilePage from '@/pages/student/StudentProfilePage'
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage'
import TeacherGroupPage from '@/pages/teacher/TeacherGroupPage'
import TeacherProgressPage from '@/pages/teacher/TeacherProgressPage'
import TeacherContentPage from '@/pages/teacher/TeacherContentPage'
import TeacherReviewsPage from '@/pages/teacher/TeacherReviewsPage'
import TeacherQuizEditorPage from '@/pages/teacher/TeacherQuizEditorPage'
import TeacherKMJPage from '@/pages/teacher/TeacherKMJPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminNotificationsPage from '@/pages/admin/AdminNotificationsPage'
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage'

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('mockUser'))

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />
  }

  return children
}

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/lessons"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLessonsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/lesson/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLessonDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/task/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentTaskPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/quiz/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentQuizPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/group"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherGroupPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/progress"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherProgressPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/content"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherContentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/reviews"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherReviewsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/quiz-editor"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherQuizEditorPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/kmj"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherKMJPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminNotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminSettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter