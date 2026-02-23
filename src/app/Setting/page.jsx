import { GetUser } from '../provider';
import Navbar from '../component/nav';
import SettingPage from './setting';

export default function Setting() {
    return (
        <div className='Setting-wrap'>
            <GetUser>
                <Navbar />
                <SettingPage />
            </GetUser>
        </div>
    );
}
