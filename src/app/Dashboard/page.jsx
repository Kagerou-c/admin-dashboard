import { GetUser } from '../provider';
import DashboardAuthContex from '../contex/DashboardAuth'
import Navbar from '../component/nav'
import Dashboard from './dashboard'


export default function DashboardPage() {



  return (
    <div className='Dashbord-wrap'>
      <GetUser>
        <Navbar/>
        <Dashboard />
      </GetUser>
    </div>

  );
}
