<script>
    import { createEventDispatcher } from 'svelte'
    import { createClass } from '../../common/utils'

    export let value
    export let label = ''
    export let validator = undefined
    export let required
    export let className = ''
    export let rows = ''
    export let cols = ''

    let inputElement
    let cancelBlur
    let focus = false
    let error

    const dispatch = createEventDispatcher()

    function focusInput() {
        if (!focus) {
            inputElement.focus()
        }
    }

    function handleFocus() {
        if (cancelBlur) {
            window.clearTimeout(cancelBlur)
            cancelBlur = undefined
        }
        focus = true
    }

    function handleBlur() {
        cancelBlur = window.setTimeout(() => {
            focus = false
        }, 150)
    }

    function handleKeyup(event) {
        if (validator) {
            error = validator(value)
        }
        dispatch('keyup', event)
    }

    function handleChange(event) {
        dispatch('change', event)
    }
</script>

<div class="{createClass('wrapper', className)}">
    <div class="container flex d-flex"
         class:focus
         class:error
         on:click={focusInput}>
        <textarea class="flex"
                  bind:value={value}
                  bind:this={inputElement}
                  {required}
                  {rows}
                  {cols}
                  on:change={handleChange}
                  on:keyup={handleKeyup}
                  on:focus={handleFocus}
                  on:blur={handleBlur}
        />
        {#if label}
            <label class:required
                   class:fullsize={!value && !focus}>
                {label}
            </label>
        {/if}
    </div>

    {#if error}
        <div class="flex extra error">
            {error}
        </div>
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .container {
        position: relative;
        flex: auto;
        min-width: 0;
        padding: .375rem .5rem .375rem .625rem;
        cursor: text;
    }

    .container:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        border: 1px solid rgba(var(--font-color-rgb), .2);
        border-radius: .25rem;
        transition: border 150ms cubic-bezier(0, 0, .2, .1);
    }

    .container:hover:before {
        border-color: var(--font-color);
    }

    .container.focus:before,
    .container.error:before {
        border-width: 2px;
    }

    .container.focus:before {
        border-color: var(--primary);
    }

    .container.error:before {
        border-color: var(--danger);
    }

    label {
        position: absolute;
        top: -.5rem;
        left: .25rem;
        padding: 0 .25rem;
        font-size: .75rem;
        line-height: 1;
        font-weight: 600;
        color: var(--font-color);
        background-color: var(--background);
        transition: top 150ms cubic-bezier(0, 0, .2, .1),
        color 150ms cubic-bezier(0, 0, .2, .1),
        line-height 150ms cubic-bezier(0, 0, .2, .1),
        font-size 150ms cubic-bezier(0, 0, .2, .1);
    }

    label.fullsize {
        top: .375rem;
        font-size: 1rem;
        line-height: 1.5;
    }

    label.required:after {
        content: "*";
    }

    .container.focus label {
        color: var(--primary);
    }

    .container.error label {
        color: var(--danger);
    }

    textarea {
        border: 0;
        font: inherit;
        resize: vertical;
        outline: 0;
        padding: 0;
        width: 100%;
    }

    .extra {
        font-weight: 600;
        font-size: .875rem;
        margin-left: .75rem;
    }

    .extra.error {
        color: var(--danger);
    }
</style>
