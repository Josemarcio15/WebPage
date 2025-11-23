<script>
    let diaria = "";
    let mensal = "";
    let trimestral = "";
    let semestral = "";
    let anual = "";

    async function salvar() {
        alert("Configurações salvas (mock).");
    }
</script>

<div class="config-container">
    <h2 class="titulo">Configuração:</h2>

    <!-- <div class="tabs">
        <button class="tab active">Tarifas Cobradas</button>
        <button class="tab disabled">Tab 2</button>
    </div> -->

    <div class="content-box">
        <div class="form-row">
            <label>Valor da Tarifa Diária:</label>
            <div class="input-group">
                <span>R$</span>
                <input type="text" bind:value={diaria} />
            </div>
        </div>

        <div class="form-row">
            <label>Valor da Tarifa Mensal:</label>
            <div class="input-group">
                <span>R$</span>
                <input type="text" bind:value={mensal} />
            </div>
        </div>

        <div class="form-row">
            <label>Valor da Tarifa Trimestral:</label>
            <div class="input-group">
                <span>R$</span>
                <input type="text" bind:value={trimestral} />
            </div>
        </div>

        <div class="form-row">
            <label>Valor da Tarifa Semestral:</label>
            <div class="input-group">
                <span>R$</span>
                <input type="text" bind:value={semestral} />
            </div>
        </div>

        <div class="form-row">
            <label>Valor da Tarifa Anual:</label>
            <div class="input-group">
                <span>R$</span>
                <input type="text" bind:value={anual} />
            </div>
        </div>

        <div class="actions">
            <button class="btn primary" on:click={salvar}>Salvar</button>
        </div>
    </div>
</div>

<style>
    .config-container {
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

    .content-box {
        border: 1px solid #d0d0d0;
        border-radius: 6px;
        padding: 18px;

        /* background: #fafafa; */
    }

    .form-row {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        gap: 14px;
        width: 400px;
    }

    label {
        width: 220px;
        font-size: 18px;
        color: #000000;
        text-align: right;
    }

    .input-group {
        display: flex;
        align-items: center;
        gap: 6px;
        background-color: #ef7401;
    }

    input {
        padding: 8px 10px;
        border-radius: 6px;
        border: 1px solid #dcdcdc;
        background: #fff;
        font-size: 14px;
        width: 120px;
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.02);
    }

    .actions {
        margin-top: 16px;
        padding-left: 220px;
    }

    .btn.primary {
        background: linear-gradient(180deg, #3d33ff, #0d02da);
        color: #fff;
    }

    .btn.primary:hover {
        background: linear-gradient(180deg, #090383, #2f049e);
        color: #ffffff;
    }
</style>
