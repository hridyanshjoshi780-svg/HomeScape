// import { Routes, Route } from "react-router-dom";

// import MainLayout from "./layouts/MainLayout";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PropertyList from "./pages/PropertyList";
// import PropertyDetails from "./pages/PropertyDetails";
// import AddProperty from "./pages/AddProperty";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/properties" element={<PropertyList />} />
//         <Route path="/property/:id" element={<PropertyDetails />} />
//         <Route path="/add-property" element={<AddProperty />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import ComparePage from "./pages/ComparePage";
import AgentProfile from "./pages/AgentProfile";
import InquiryPage from "./pages/InquiryPage";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/agent/:id" element={<AgentProfile />} />
        <Route path="/inquiry/:propertyId" element={<InquiryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;