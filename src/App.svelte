<script>
  import {onMount} from 'svelte';
  import {currentPage} from './routes';

  let pageComponent;


  // Subscribe to the store to get the current page component
  $: $currentPage, pageComponent = $currentPage;

  onMount(() => {
    // Initialize with the default route
    pageComponent = $currentPage;
  });
</script>

<main>
  <!-- Render the current page component dynamically -->
  {#if pageComponent}
    <svelte:component this={pageComponent} />
  {/if}
</main>

<style>
</style>
