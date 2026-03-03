import { GetUser } from '../provider';
import DashboardAuthContex from '../context/dashboard-auth'
import Navbar from '../components/nav'
import Dashboard from './dashboard'


export default function DashboardPage() {



  return (
    <div className='page-layout'>
      <GetUser>
        <Navbar />
        <Dashboard />
      </GetUser>
    </div>

  );
}
