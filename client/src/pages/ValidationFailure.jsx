import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from "../components/ui/button"
const ValidationFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Validation Failure</h1>
        <p className="text-gray-600 mb-4">The email you entered might already be in use.</p>
        <Button 
          className="mt-4 px-6 py-2 text-white rounded-lg transition-colors duration-300"
          onClick={() => navigate('/register')}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

export default ValidationFailure;