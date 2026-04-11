import Import from "./Import";
import Navbar from "../components/nav";
import { GetUser } from "../provider";

export default function ImportPage() {
    return (
        <div className="page-layout">
            <GetUser>
                <Navbar />
                <Import />
            </GetUser>
        </div>
    )
}
