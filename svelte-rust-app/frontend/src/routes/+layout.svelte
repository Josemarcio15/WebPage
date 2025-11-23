<script>
	import "../lib/style.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<div class="app">
	<Sidebar />

	<div class="main">
		<header class="topbar">
			<h1 class="app-title">SysMar</h1>
		</header>

		<section class="content">
			<slot />
		</section>
	</div>
</div>
