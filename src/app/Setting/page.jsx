import { GetUser } from '../provider';
import Navbar from '../components/nav';
import SettingPage from './setting';

export default function Setting() {
    return (
        <div className='page-layout'>
            <GetUser>
                <Navbar />
                <SettingPage />
            </GetUser>
        </div>
    );
}
