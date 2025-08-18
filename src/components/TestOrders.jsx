import React, { useState } from 'react';
import { createTestOrders, createSingleTestOrder } from '../firebase/testData';

export default function TestOrders() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateTestOrders = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const success = await createTestOrders();
      if (success) {
        setMessage('Test orders created successfully! Check the Dashboard to see them.');
      } else {
        setMessage('Failed to create test orders. Check console for details.');
      }
    } catch (error) {
      setMessage('Error creating test orders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSingleOrder = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const orderId = await createSingleTestOrder();
      if (orderId) {
        setMessage(`Single test order created with ID: ${orderId}`);
      } else {
        setMessage('Failed to create test order. Check console for details.');
      }
    } catch (error) {
      setMessage('Error creating test order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border-0 p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Test Orders</h3>
      <p className="text-sm text-slate-600 mb-4">
        Use these buttons to create test orders in Firebase for testing the Dashboard.
      </p>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleCreateTestOrders}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Creating...' : 'Create All Test Orders'}
        </button>
        
        <button
          onClick={handleCreateSingleOrder}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          {loading ? 'Creating...' : 'Create Single Test Order'}
        </button>
      </div>
      
      {message && (
        <div className={`p-3 rounded text-sm ${
          message.includes('successfully') || message.includes('ID:') 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}
      
      <div className="text-xs text-slate-500 mt-2">
        <p>• Test orders will appear in the Dashboard immediately</p>
        <p>• You can accept, cancel, or let them auto-complete after 5 minutes</p>
        <p>• Check the browser console for detailed logs</p>
      </div>
    </div>
  );
}
