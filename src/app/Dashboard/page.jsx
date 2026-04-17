import { GetUser } from '../provider';
import Navbar from '../components/nav'
import Dashboard from './dashboard'
import { LoadingProvider } from '../get-loading';

export default function DashboardPage() {
  return (
    <div className='page-layout'>
      <GetUser>
        <LoadingProvider>
          <Navbar />
          <Dashboard />
        </LoadingProvider>
      </GetUser>
    </div>

  );
}
