import Navbar from "../components/nav";
import { GetUser } from "../provider";
import SaldoSiswaUI from "./saldo-siswa";
import { LoadingProvider } from "../get-loading";

export default function Page() {
    return (
        <div className='page-layout'>
            <GetUser>
                <LoadingProvider>
                    <Navbar />
                    <SaldoSiswaUI />
                </LoadingProvider>
            </GetUser>
        </div>
    );
}
