<script>
    import { onMount } from "svelte";

    let filtroData = "";
    let itens = [];

    function formatarDataISO(iso) {
        const partes = iso.split("-");
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    function entradaDuplicada(tipo) {
        return tipo == 1 ? "⚠️" : "✅";
    }

    async function carregarLista(dataSelecionada) {
        try {
            const resposta = await fetch(`/api/itens?data=${dataSelecionada}`);
            const dados = await resposta.json();
            itens = dados.reverse();
        } catch (erro) {
            console.error("Erro ao carregar itens:", erro);
        }
    }

    function buscar() {
        carregarLista(filtroData);
    }

    onMount(() => {
        const hoje = new Date().toISOString().split("T")[0];
        filtroData = hoje;
        carregarLista(filtroData);
    });
</script>

<h1 class="titulo">Fluxo de Alunos</h1>

<div class="filtro-container">
    <label for="filtroData">Filtrar por data:</label>
    <input type="date" bind:value={filtroData} lang="pt-BR" />
    <button on:click={buscar}>Buscar</button>
</div>

<div class="fluxo-container">
    <div class="tabela-container">
        <table class="tabela-fluxo">
            <thead>
                <tr>
                    <th>Duplicado</th>
                    <th>Cliente</th>
                    <th>Plano</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Hora</th>
                </tr>
            </thead>
            <tbody>
                {#each itens as item}
                    <tr>
                        <td>{entradaDuplicada(item.entrada_duplicada)}</td>
                        <td>{item.nome_cliente}</td>
                        <td>{item.plano}</td>
                        <td>{item.status}</td>
                        <td>{formatarDataISO(item.dia_entrada)}</td>
                        <td>{item.hora_entrada}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .titulo {
        text-align: center;
        font-size: 35px;
        color: #ef7401;
        margin-bottom: 20px;
    }

    .fluxo-container {
        background: #ef7401;
        border: 2px solid;
        height: 60vh;
        width: 80%;
        margin: 0 auto;
        position: relative;
        padding: 50px;
        border-radius: 25px;
    }

    .tabela-fluxo {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        font-size: 18px;
        background: white;
    }

    .tabela-fluxo th {
        background-color: #f2f2f2;
        padding: 12px;
        text-align: left;
        font-weight: bold;
        border-bottom: 2px solid #ddd;
    }

    .tabela-fluxo td {
        border-bottom: 1px solid #ddd;
        padding: 10px;
    }

    .tabela-fluxo tr:hover {
        background-color: #f9f9f9;
    }

    .tabela-container {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .filtro-container {
        margin-bottom: 20px;
        display: flex;
        gap: 15px;
        font-size: 18px;
        justify-content: center;
        align-items: center;
    }

    .filtro-container label {
        font-weight: bold;
        color: white;
        font-size: 20px;
        background-color: #0026ff;
        border-radius: 6px;
        padding: 10px;
    }

    .filtro-container input[type="date"] {
        padding: 8px 12px;
        font-size: 16px;
        border: 2px solid #0026ff;
        border-radius: 8px;
        outline: none;
    }

    .filtro-container button {
        padding: 8px 15px;
        font-size: 16px;
        border: none;
        border-radius: 50px;
        background-color: #0026ff;
        color: white;
        cursor: pointer;
        transition: 0.3s;
    }

    .filtro-container button:hover {
        background-color: #bb0202;
    }
</style>
