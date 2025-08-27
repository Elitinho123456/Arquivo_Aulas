import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MainContent from "./Components/MainContent";

export default function App() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <MainContent />
            </main>
            <Footer />
        </div>
    )
}