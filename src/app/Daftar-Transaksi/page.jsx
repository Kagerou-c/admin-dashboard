

import Navbar from "../components/nav";
import { GetUser } from "../provider";
import DaftarTransaksiUI from "./Daftar-Transkasi";
import { LoadingProvider } from "../get-loading";

export default function Page() {
    return (
        <div className='page-layout'>
            <GetUser>
                <LoadingProvider>
                    <Navbar />
                    <DaftarTransaksiUI />
                </LoadingProvider>
            </GetUser>
        </div>
    );
}
