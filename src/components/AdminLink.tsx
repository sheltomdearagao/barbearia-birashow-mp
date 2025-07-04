
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLink = () => {
  return (
    <Link to="/admin">
      <Button variant="outline" size="sm" className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream">
        <Settings className="h-4 w-4 mr-2" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminLink;
