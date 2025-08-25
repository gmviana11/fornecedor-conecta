import { useState, useEffect } from 'react';
import { initializeSeedData } from '@/lib/seedData';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

const STORAGE_KEY = 'mxs-suppliers';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    // Initialize with seed data if no data exists
    initializeSeedData();
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSuppliers(JSON.parse(stored));
    }
  }, []);

  const saveSuppliers = (newSuppliers: Supplier[]) => {
    setSuppliers(newSuppliers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSuppliers));
  };

  const addSupplier = (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    saveSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    const updated = suppliers.map(supplier => 
      supplier.id === id 
        ? { ...supplier, ...updates, updatedAt: new Date().toISOString() }
        : supplier
    );
    saveSuppliers(updated);
  };

  const deleteSupplier = (id: string) => {
    const filtered = suppliers.filter(supplier => supplier.id !== id);
    saveSuppliers(filtered);
  };

  const addComment = (supplierId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updated = suppliers.map(supplier => 
      supplier.id === supplierId 
        ? { 
            ...supplier, 
            comments: [...(supplier.comments || []), newComment],
            updatedAt: new Date().toISOString()
          }
        : supplier
    );
    saveSuppliers(updated);
  };

  return {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addComment
  };
};