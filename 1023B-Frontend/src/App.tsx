import { useEffect, useState } from "react";

type Produtos = {
    _id: string;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
}

export default function App() {

    const [produtos, setProdutos] = useState<Produtos[]>([]);

    useEffect(() => {
        fetch('/api/produtos')
            .then(response => response.json())
            .then(data => setProdutos(data))
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
                {produtos.map((produto) => (
                    <div key={produto._id}>
                        <h2>{produto.nome}</h2>
                        <p>{produto.preco}</p>
                        <p>{produto.descricao}</p>
                        <p>{produto.quantidade}</p>
                    </div>
                ))}
        </div>
    )
}