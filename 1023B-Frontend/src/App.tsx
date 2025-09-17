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

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());


        fetch('/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => setProdutos([...produtos, data]))
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">


            <div>Cadastro de Produtos</div>
            <form onSubmit={handleForm}>
                <input type="text" name="nome" placeholder="Nome" />
                <input type="text" name="descricao" placeholder="Descricao" />
                <input type="number" name="preco" placeholder="Preco" />
                <input type="number" name="quantidade" placeholder="Quantidade" />
                <button type="submit">Cadastrar</button>
            </form>

            <h1>Produtos</h1>

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