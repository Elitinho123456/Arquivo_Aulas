export default function MainContent() {
    return (
        <main className="container mx-auto px-6 py-12">

            {/* Seção Herói */}
            <section className="text-center">
                <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Construa o Futuro da Web</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Junte-se a nós na criação de experiências digitais incríveis com as tecnologias mais modernas e poderosas.
                </p>
                <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 duration-300">
                    Comece Agora
                </button>
            </section>

            {/* Seção de Recursos */}
            <section className="mt-20">
                
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Recursos Principais</h3>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Design Responsivo</h4>
                        <p className="text-gray-600">
                            Seu site terá uma aparência perfeita em qualquer dispositivo, do celular ao desktop.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Componentes Modernos</h4>
                        <p className="text-gray-600">
                            Utilizamos os componentes mais recentes do React para uma interface rápida e interativa.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Estilização com Tailwind</h4>
                        <p className="text-gray-600">
                            Um framework CSS que nos permite criar designs personalizados de forma rápida e eficiente.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    )
}