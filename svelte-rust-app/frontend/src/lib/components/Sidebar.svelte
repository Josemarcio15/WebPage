<script>
    import { page } from "$app/stores";

    const menu = [
        {
            id: "inicio",
            label: "Fluxo",
            href: "/",
            icon: "M3 12h18M3 6h18M3 18h18",
        },
        {
            id: "cadastro",
            label: "Cadastro",
            href: "/cadastro",
            icon: "M12 2v20M2 12h20",
        },
        {
            id: "financeiro",
            label: "Financeiro",
            href: "/financeiro",
            icon: "M4 6h16v12H4z",
        },
        {
            id: "aluno",
            label: "Aluno",
            href: "/aluno",
            icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20a8 8 0 0 1 16 0",
        },
        {
            id: "config",
            label: "Configuração",
            href: "/configuracao",
            icon: "M12 8v8M8 12h8",
        },
    ];
</script>

<nav class="sidebar" aria-label="Main menu">
    <div class="sidebar-top"></div>
    <ul class="menu">
        {#each menu as item}
            <li
                class="menu-item"
                class:selected={$page.url.pathname === item.href}
            >
                <a
                    href={item.href}
                    class="menu-link"
                    aria-current={$page.url.pathname === item.href
                        ? "page"
                        : undefined}
                >
                    <svg
                        class="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d={item.icon} />
                    </svg>

                    <span class="menu-text">{item.label}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>
