import Navbar from "../components/nav";
import { GetUser } from "../provider";
import SaldoSiswaUI from "./saldo-siswa";

export default function Page() {
    return (
        <div className='page-layout'>
            <GetUser>
                <Navbar />
                <SaldoSiswaUI />
            </GetUser>
        </div>
    );
}
