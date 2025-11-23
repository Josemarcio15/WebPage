<script>
    import { onMount } from "svelte";

    // estados do formulário
    let nome = "";
    let matricula = "";
    let cpf = "";
    let status = "";
    let dia_vencimento = "";
    let vencimento = "";
    let plano = "";
    let dias = 0;
    let valor_normal = "";
    let valor_com_desconto = "";
    let tipo_valor = "normal"; // "normal" ou "desconto"
    let valor_a_pagar = "";
    let email = "";

    let buscando = false;
    let salvando = false;

    // autocomplete / sugestões
    let suggestions = [];
    let showSuggestions = false;
    let sugestaoAtiva = -1;
    let debounceTimer;

    // Regras: chamar endpoint criado no backend
    // GET /api/clientes/nome/:nome -> retorna array [{ id, nome, cpf }, ...]
    async function buscarPorNome(q) {
        if (!q || q.trim().length < 2) {
            suggestions = [];
            showSuggestions = false;
            return;
        }

        buscando = true;
        try {
            const res = await fetch(
                `/api/clientes/nome/${encodeURIComponent(q)}`,
            );
            if (!res.ok) {
                suggestions = [];
                showSuggestions = false;
                return;
            }

            const dados = await res.json();

            suggestions = dados.map((d) => ({
                id: d.id,
                nome: d.nome,
                cpf: d.cpf,
                label: `${d.nome} — ${d.cpf}`,
            }));

            showSuggestions = suggestions.length > 0;
            sugestaoAtiva = -1;
        } catch (err) {
            console.error("Erro ao buscar por nome:", err);
            suggestions = [];
            showSuggestions = false;
        } finally {
            buscando = false;
        }
    }

    function onNomeInput(e) {
        nome = e.target.value;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            buscarPorNome(nome);
        }, 50);
    }

    function selecionarSugestao(item) {
        nome = item.nome;
        cpf = item.cpf;
        // usar id como matrícula (ajuste se seu backend usar outro campo)
        matricula = String(item.id);
        showSuggestions = false;
        suggestions = [];
        // opcional: buscar dados completos do cliente ao selecionar
        // pesquisarCliente();
    }

    // keyboard navigation for suggestions
    function onNomeKeyDown(e) {
        if (!showSuggestions) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            sugestaoAtiva = Math.min(sugestaoAtiva + 1, suggestions.length - 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            sugestaoAtiva = Math.max(sugestaoAtiva - 1, 0);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (sugestaoAtiva >= 0 && suggestions[sugestaoAtiva]) {
                selecionarSugestao(suggestions[sugestaoAtiva]);
            } else {
                // se não houver sugestão ativa, pode disparar pesquisa por matrícula/cpf
                pesquisarCliente();
            }
        } else if (e.key === "Escape") {
            showSuggestions = false;
            suggestions = [];
        }
    }

    // Pesquisar cliente por matrícula (ou cpf) - faz fetch para o backend Rust
    async function pesquisarCliente() {
        if (!matricula) {
            alert("Informe a matrícula.");
            return;
        }

        buscando = true;
        try {
            const res = await fetch(`/api/cliente/${matricula}`);

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "Erro ao consultar cliente");
            }

            const data = await res.json();

            // Campos principais
            nome = data.nome ?? "";
            cpf = data.cpf ?? "";
            email = data.email ?? "";
            plano = data.plano ?? "";
            status = ""; // backend não envia status
            dia_vencimento = data.dia_do_pagamento ?? "";

            // Vencimento
            if (data.vencimento) {
                vencimento = data.vencimento;
            } else {
                vencimento = "";
            }

            // Valores (backend NÃO envia)
            valor_normal = "";
            valor_com_desconto = "";

            calcularValor();
        } catch (err) {
            console.error(err);
            alert("Erro ao pesquisar cliente: " + (err.message ?? err));
        } finally {
            buscando = false;
        }
    }

    // Calcula o valor a pagar com base na opção selecionada e nos dias (ex.: juros)
    function calcularValor() {
        const parse = (v) => {
            if (v === null || v === undefined || v === "") return 0;
            return Number(String(v).replace(",", ".")) || 0;
        };

        const base =
            tipo_valor === "normal"
                ? parse(valor_normal)
                : parse(valor_com_desconto);
        const jurosPorDia = 0.0;
        const calculo = base + base * jurosPorDia * Number(dias || 0);
        valor_a_pagar = calculo > 0 ? calculo.toFixed(2) : "";
    }

    // Efetuar pagamento (POST para backend)
    async function efetuarPagamento() {
        if (!nome || !matricula) {
            alert(
                "Pesquise e selecione um cliente antes de efetuar o pagamento.",
            );
            return;
        }
        if (!valor_a_pagar) {
            alert("Calcule o valor a pagar antes.");
            return;
        }

        salvando = true;
        try {
            const payload = {
                cliente_matricula: matricula,
                cliente_cpf: cpf,
                valor_pago: Number(String(valor_a_pagar).replace(",", ".")),
                plano: plano,
                dias: Number(dias || 0),
                tipo_valor: tipo_valor,
                vencimento: vencimento,
            };

            const res = await fetch("/api/pagamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "Erro ao efetuar pagamento");
            }

            alert("Pagamento registrado com sucesso.");
            limparCamposPagamento();
        } catch (err) {
            console.error(err);
            alert("Erro ao salvar pagamento: " + (err.message ?? err));
        } finally {
            salvando = false;
        }
    }

    function limparCamposPagamento() {
        status = "";
        dia_vencimento = "";
        vencimento = "";
        plano = "";
        dias = 0;
        valor_normal = "";
        valor_com_desconto = "";
        valor_a_pagar = "";
        tipo_valor = "normal";
    }

    function limparTudo() {
        nome = "";
        matricula = "";
        cpf = "";
        email = "";
        limparCamposPagamento();
    }

    // garantir cálculo reativo
    $: calcularValor();
</script>

<div class="financeiro-container">
    <h2 class="titulo">Pagamento:</h2>

    <form class="grid" on:submit|preventDefault={() => efetuarPagamento()}>
        <!-- Linha: Nome, Matrícula + Pesquisar, CPF -->
        <div class="row">
            <div class="field large" style="position: relative;">
                <label for="nome">Nome:</label>
                <input
                    id="nome"
                    type="text"
                    bind:value={nome}
                    on:input={onNomeInput}
                    on:keydown={onNomeKeyDown}
                    autocomplete="off"
                    aria-autocomplete="list"
                />

                {#if showSuggestions}
                    <ul class="suggestions" role="listbox">
                        {#each suggestions as s, i}
                            <li
                                class:selected={i === sugestaoAtiva}
                                on:mousedown|preventDefault={() =>
                                    selecionarSugestao(s)}
                                role="option"
                                aria-selected={i === sugestaoAtiva}
                            >
                                {s.label}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <div class="field medium">
                <label for="matricula">Matrícula:</label>
                <div class="inline-search">
                    <input id="matricula" type="text" bind:value={matricula} />
                    <button
                        type="button"
                        class="btn primary"
                        on:click={pesquisarCliente}
                        disabled={buscando}
                    >
                        {#if buscando}Pesquisando...{:else}Pesquisar{/if}
                    </button>
                </div>
            </div>

            <div class="field small">
                <label for="cpf">CPF:</label>
                <input id="cpf" type="text" bind:value={cpf} />
            </div>
        </div>

        <!-- Linha: Status, Dia do vencimento, Vencimento, Email -->
        <div class="row">
            <div class="field small">
                <label for="status">Status:</label>
                <input id="status" type="text" bind:value={status} />
            </div>

            <div class="field small">
                <label for="dia_vencimento">Dia do vencimento:</label>
                <input
                    id="dia_vencimento"
                    type="text"
                    bind:value={dia_vencimento}
                />
            </div>

            <div class="field small">
                <label for="vencimento">Vencimento:</label>
                <input
                    id="vencimento"
                    type="text"
                    bind:value={vencimento}
                    placeholder="dd-mm-aaaa"
                />
            </div>

            <div class="field medium">
                <label for="email">Email</label>
                <input id="email" type="email" bind:value={email} />
            </div>
        </div>

        <!-- Linha: Plano, Valor Normal / Valor com Desconto -->
        <div class="row">
            <div class="field medium">
                <label for="plano">Plano:</label>
                <select id="plano" bind:value={plano}>
                    <option value="">-- selecione --</option>
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="anual">Anual</option>
                </select>
            </div>

            <div class="field small">
                <label for="valor_normal">Valor Normal:</label>
                <input
                    id="valor_normal"
                    type="text"
                    bind:value={valor_normal}
                    placeholder="0.00"
                />
            </div>

            <div class="field small">
                <label for="valor_desconto">Valor com Desconto:</label>
                <input
                    id="valor_desconto"
                    type="text"
                    bind:value={valor_com_desconto}
                    placeholder="0.00"
                />
            </div>
        </div>

        <!-- Linha: Dias, Tipo de valor (radio), Valor a pagar -->
        <div class="row">
            <div class="field xsmall">
                <label for="dias">Dias:</label>
                <input id="dias" type="number" min="0" bind:value={dias} />
            </div>

            <div class="field radios">
                <label>Tipo de valor:</label>
                <div class="radio-row">
                    <label class="radio">
                        <input
                            type="radio"
                            name="tipo_valor"
                            value="normal"
                            bind:group={tipo_valor}
                        />
                        <span>Valor Normal</span>
                    </label>
                    <label class="radio">
                        <input
                            type="radio"
                            name="tipo_valor"
                            value="desconto"
                            bind:group={tipo_valor}
                        />
                        <span>Valor com Desconto</span>
                    </label>
                </div>
            </div>

            <div class="field small">
                <label for="valor_a_pagar">Valor a pagar:</label>
                <input
                    id="valor_a_pagar"
                    type="text"
                    bind:value={valor_a_pagar}
                    readonly
                />
            </div>
        </div>

        <!-- Ações -->
        <div class="row actions-row">
            <button type="submit" class="btn primary" disabled={salvando}>
                {#if salvando}Gravando...{:else}Efetuar pagamento{/if}
            </button>

            <button type="button" class="btn secondary" on:click={limparTudo}>
                Limpar
            </button>
        </div>
    </form>
</div>

<style>
    .financeiro-container {
        padding: 22px 26px;
        max-width: 1100px;
        background: #ef7401;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    }

    .titulo {
        font-size: 30px;
        font-weight: 600;
        color: #333;
        margin-bottom: 18px;
    }

    form.grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .row {
        display: flex;
        align-items: center;
        gap: 18px;
    }

    .field {
        display: flex;
        flex-direction: column;
    }

    .field.large {
        flex: 1 1 60%;
    }

    .field.medium {
        flex: 1 1 28%;
    }

    .field.small {
        flex: 0 0 180px;
    }

    .field.xsmall {
        flex: 0 0 90px;
    }

    .inline-search {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    label {
        font-size: 18px;
        color: #000000;
        margin-bottom: 6px;
    }

    input[type="text"],
    input[type="number"],
    input[type="email"],
    select {
        padding: 8px 10px;
        border-radius: 6px;
        border: 1px solid #dcdcdc;
        background: #fff;
        font-size: 14px;
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.02);
    }

    /* suggestions */
    .suggestions {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% + 6px);
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        max-height: 220px;
        overflow-y: auto;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        z-index: 50;
        padding: 6px 0;
        margin: 0;
        list-style: none;
    }

    .suggestions li {
        padding: 10px 12px;
        cursor: pointer;
        font-size: 14px;
        color: #222;
    }

    .suggestions li:hover,
    .suggestions li[selected],
    .suggestions li[class*="selected"] {
        background: #f2f2f2;
    }

    .suggestions li[selected="true"] {
        background: #f2f2f2;
    }

    .suggestions li[selected] {
        background: #f2f2f2;
    }

    /* radios */
    .radios .radio-row {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .radio {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .radio input {
        width: 16px;
        height: 16px;
    }

    /* botões */
    .btn {
        padding: 8px 14px;
        border-radius: 6px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
    }

    .btn.primary {
        background: linear-gradient(180deg, #ff8a33, #ef7401);
        color: #fff;
    }

    .btn.primary:hover {
        filter: brightness(0.95);
    }

    .btn.secondary {
        background: #f3f3f3;
        color: #333;
    }

    .btn.secondary:hover {
        filter: brightness(0.98);
    }

    .actions-row {
        margin-top: 6px;
        display: flex;
        gap: 12px;
    }

    @media (max-width: 900px) {
        .row {
            flex-direction: column;
            align-items: stretch;
        }

        .field.small,
        .field.medium {
            flex: 1 1 auto;
        }
    }
</style>
