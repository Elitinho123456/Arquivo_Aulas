export default function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Meu Site Incrível</h1>
                <nav>
                    <a href="#" className="px-4 hover:text-gray-300 transition-colors duration-300">Início</a>
                    <a href="#" className="px-4 hover:text-gray-300 transition-colors duration-300">Sobre</a>
                    <a href="#" className="px-4 hover:text-gray-300 transition-colors duration-300">Contato</a>
                </nav>
            </div>
        </header>
    )
}