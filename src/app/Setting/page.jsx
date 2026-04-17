import { GetUser } from '../provider';
import Navbar from '../components/nav';
import SettingPage from './setting';
import { LoadingProvider } from '../get-loading';

export default function Setting() {
    return (
        <div className='page-layout'>
            <GetUser>
                <LoadingProvider>
                    <Navbar />
                    <SettingPage />
                </LoadingProvider>
            </GetUser>
        </div>
    );
}
