

import Navbar from "../components/nav";
import { GetUser } from "../provider";
import DaftarTransaksiUI from "./Daftar-Transkasi";

export default function Page() {
    return (
        <div className='page-layout'>
            <GetUser>
                <Navbar />
                <DaftarTransaksiUI />
            </GetUser>
        </div>
    );
}
