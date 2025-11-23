<script>
    // Estados do formulário — lado esquerdo
    let matricula = "";
    let nome = "";
    let cpf = "";
    let data_nascimento = "";
    let email = "";
    let telefone = "";
    let endereco = "";
    let bairro = "";
    let numero = "";
    let complemento = "";
    let sexo = "";

    // Área da TAG — lado direito
    let numero_tag = "";

    function salvarTag() {
        alert("Salvar TAG (implementar)");
    }

    function cancelarTag() {
        numero_tag = "";
    }

    function salvarAluno() {
        alert("Salvar aluno (implementar)");
    }

    function cancelarAluno() {
        matricula = "";
        nome = "";
        cpf = "";
        data_nascimento = "";
        email = "";
        telefone = "";
        endereco = "";
        bairro = "";
        numero = "";
        complemento = "";
        sexo = "";
    }
</script>

<div class="aluno-container">
    <h2 class="titulo">Aluno:</h2>

    <div class="layout">
        <!-- COLUNA ESQUERDA -->
        <div class="col-esquerda">
            <div class="field">
                <label>Matrícula:</label>
                <input type="text" bind:value={matricula} />
            </div>

            <div class="field">
                <label>Nome:</label>
                <input type="text" bind:value={nome} />
            </div>

            <div class="field">
                <label>CPF:</label>
                <input type="text" bind:value={cpf} />
            </div>

            <div class="field">
                <label>Data de nascimento:</label>
                <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    bind:value={data_nascimento}
                />
            </div>

            <div class="field">
                <label>Email:</label>
                <input type="email" bind:value={email} />
            </div>

            <div class="field">
                <label>Telefone:</label>
                <input type="text" bind:value={telefone} />
            </div>

            <div class="field">
                <label>Endereço:</label>
                <input type="text" bind:value={endereco} />
            </div>

            <div class="field">
                <label>Bairro:</label>
                <input type="text" bind:value={bairro} />
            </div>

            <div class="field">
                <label>Número:</label>
                <input type="text" bind:value={numero} />
            </div>

            <div class="field">
                <label>Complemento:</label>
                <input type="text" bind:value={complemento} />
            </div>

            <div class="field">
                <label>Sexo:</label>
                <select bind:value={sexo}>
                    <option value="">Selecione</option>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                </select>
            </div>

            <div class="actions">
                <button class="btn primary" on:click={salvarAluno}
                    >Salvar</button
                >
                <button class="btn secondary" on:click={cancelarAluno}
                    >Cancelar</button
                >
            </div>
        </div>

        <!-- COLUNA DIREITA — TAG -->
        <div class="col-direita">
            <div class="tag-box">
                <h3>Controle de TAG</h3>

                <div class="field">
                    <label>Número da TAG:</label>
                    <input type="text" bind:value={numero_tag} />
                </div>

                <div class="tag-actions">
                    <button class="btn primary" on:click={salvarTag}
                        >Salvar</button
                    >
                    <button class="btn secondary" on:click={cancelarTag}
                        >Cancelar</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .aluno-container {
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

    .layout {
        display: flex;
        gap: 22px;
        align-items: flex-start;
    }

    .col-esquerda {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .col-direita {
        width: 300px;
    }

    .tag-box {
        background: #fff;
        border-radius: 8px;
        padding: 18px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        border-left: 4px solid #ef7401;
    }

    .tag-box h3 {
        margin: 0 0 12px 0;
        font-size: 18px;
        color: #444;
    }

    .field {
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 18px;
        color: #000000;
        margin-bottom: 6px;
    }

    input,
    select {
        padding: 8px 10px;
        border-radius: 6px;
        border: 1px solid #dcdcdc;
        background: #fff;
        font-size: 14px;
    }

    .actions,
    .tag-actions {
        display: flex;
        gap: 12px;
        margin-top: 10px;
    }

    .btn {
        padding: 8px 14px;
        border-radius: 6px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
        font-size: 14px;
    }

    .btn.primary {
        background: linear-gradient(180deg, #3d33ff, #0d02da);
        color: #fff;
    }

    .btn.primary:hover {
        background: linear-gradient(180deg, #090383, #2f049e);
        color: #ffffff;
    }

    .btn.secondary {
        background: linear-gradient(180deg, #f80000, #b60303);
        color: #ffffff;
    }

    .btn.secondary:hover {
        background: linear-gradient(180deg, #7a0202, #750202);
        color: #ffffff;
    }

    @media (max-width: 900px) {
        .layout {
            flex-direction: column;
        }
        .col-direita {
            width: 100%;
        }
    }
</style>
