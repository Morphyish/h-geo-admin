<script>
    const year = new Date().getFullYear()
</script>

<footer>
    <div>Code licensed under an MIT License</div>
    <div>H.Geo ©2016-{year}</div>
    <div>Powered by Sapper</div>
</footer>

<style>
footer {
    display: flex;
    justify-content: space-between;
    font-size: .75rem;
    color: var(--font-color);
    margin-top: auto;
    padding: 1rem 2.5rem;
    opacity: .4;
}
</style>
