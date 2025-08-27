export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center">
                    <div className="text-sm">
                        <p>&copy; 2024 Meu Site Incrível. Todos os direitos reservados.</p>
                        <p className="mt-2">Feito com ❤️ e Tailwind CSS</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400 transition-colors duration-300">Facebook</a>
                        <a href="#" className="hover:text-pink-400 transition-colors duration-300">Instagram</a>
                        <a href="#" className="hover:text-blue-300 transition-colors duration-300">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}