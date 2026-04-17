import Import from "./Import";
import Navbar from "../components/nav";
import { GetUser } from "../provider";
import { LoadingProvider } from "../get-loading";

export default function ImportPage() {
    return (
        <div className="page-layout">
            <GetUser>
                <LoadingProvider>
                    <Navbar />
                    <Import />
                </LoadingProvider>
            </GetUser>
        </div>
    )
}
