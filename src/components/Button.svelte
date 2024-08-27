<script>
    //props
    export let type = "button";
    export let size = "sm";
    export let variant = "primary";
    export let disabled = false;
    export let onClick = () => {};
</script>

<button {type} class="btn btn-{size} btn-{variant}" on:click={onClick} {disabled}>
    <slot></slot>
</button>
