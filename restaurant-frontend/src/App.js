import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ManageSection from './pages/ManageSection';
import Contact from './components/Contact';
import BookTable from './pages/BookTable';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from "./Context/AuthContext"; 
import TableBookingList from './pages/TableBookingList';
import EditBooking from "./pages/EditBooking";
import TablesPage from './pages/Tables';
import CreateTablePage from './pages/CreateTables'; 
import MenuPage from './components/Menu';
import AddItemPage from "./pages/AddItem";    
import ManageSectionsPage from './pages/ManageSection';
const App = () => {
    return (
        <AuthProvider>
      <Router>
        <Header />
        
        <Routes>
        <Route path="/" element={<Home />} />
                
                <Route path="/book-table" element={<BookTable />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/my-bookings" element={<TableBookingList />} />
                <Route path="/edit-booking/:id" element={<EditBooking />} /> 
                <Route path="/manage-sections" element={<ManageSection />} />
                <Route path="/tables" element={<TablesPage />} />
                <Route path="/tables/create" element={<CreateTablePage />} />
                <Route path="/tables/:tableId/menu" element={<MenuPage />} />            
                 <Route path="/add-item/:sectionId" element={<AddItemPage />} />
                <Route path="/manage-sections/:tableId" element={<ManageSectionsPage />} />


        </Routes>
      </Router>

    </AuthProvider>
    );
};

export default App;
