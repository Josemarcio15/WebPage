<script>
    let nome = "";
    let cpf = "";
    let sexo = "";
    let endereco = "";
    let numero = "";
    let complemento = "";
    let bairro = "";
    let data_nascimento = "";
    let email = "";
    let telefone = "";
</script>

<div class="cadastro-container">
    <h2 class="titulo">Cadastro de clientes:</h2>

    <!-- LINHA 1 -->
    <div class="form-row">
        <div class="field">
            <label for="nome">Nome:</label>
            <input id="nome" bind:value={nome} type="text" />
        </div>

        <div class="field small">
            <label for="cpf">CPF:</label>
            <input id="cpf" bind:value={cpf} type="text" />
        </div>

        <div class="field small">
            <label for="sexo">Sexo:</label>
            <select id="sexo" bind:value={sexo}>
                <option value="">Selecione</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
            </select>
        </div>
    </div>

    <!-- LINHA 2 -->
    <div class="form-row">
        <div class="field">
            <label for="endereco">Endereço:</label>
            <input id="endereco" bind:value={endereco} type="text" />
        </div>

        <div class="field small">
            <label for="numero">Número:</label>
            <input id="numero" bind:value={numero} type="text" />
        </div>

        <div class="field">
            <label for="complemento">Complemento:</label>
            <input id="complemento" bind:value={complemento} type="text" />
        </div>

        <div class="field small">
            <label for="bairro">Bairro:</label>
            <input id="bairro" bind:value={bairro} type="text" />
        </div>
    </div>

    <!-- LINHA 3 -->
    <div class="form-row">
        <div class="field small">
            <label for="data_nascimento">Nascimento:</label>
            <input
                id="data_nascimento"
                bind:value={data_nascimento}
                type="text"
                placeholder="dd/mm/aaaa"
            />
        </div>

        <div class="field">
            <label for="email">Email:</label>
            <input id="email" bind:value={email} type="email" />
        </div>

        <div class="field small">
            <label for="telefone">Telefone:</label>
            <input id="telefone" bind:value={telefone} type="tel" />
        </div>
    </div>

    <!-- BOTÕES -->
    <div class="actions">
        <button class="btn btn-primary">Cadastrar Cliente</button>
        <button class="btn btn-danger">Limpar</button>
    </div>
</div>

<style>
    .cadastro-container {
        padding: 20px 26px;
        background: #ef7401;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
    }

    .titulo {
        margin-bottom: 18px;
        font-size: 22px;
        font-weight: 600;
        color: #333;
    }

    .form-row {
        display: flex;
        gap: 14px;
        margin-bottom: 14px;
    }

    .field {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .small {
        flex: 0 0 160px;
    }

    label {
        font-size: 18px;
        margin-bottom: 4px;
        color: #000000;
    }

    input,
    select {
        padding: 8px 10px;
        border: 1px solid #d6d6d6;
        border-radius: 6px;
        font-size: 14px;
        background: #fff;
    }

    .actions {
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        width: 220px;
        gap: 10px;
    }

    .btn {
        padding: 10px;
        font-weight: 600;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    }

    .btn-primary {
        background: linear-gradient(180deg, #3d33ff, #0d02da);
        color: #fff;
    }

    .btn-primary:hover {
        background: linear-gradient(180deg, #19139d, #0d086d);
        color: #fff;
    }

    .btn-danger {
        background: linear-gradient(180deg, #f80000, #b60303);
        color: #ffffff;
    }

    .btn-danger:hover {
        background: #ff0000;
    }
</style>
