<script>
    import {parseSpine} from './spineParse';

    let data;
    let files;
    let fileName = '';
    $: {
        if(files && files[0]){
            fileName = files[0].name;
            parseSpine(files[0]);
        }
    }

    function openFileClick(){
        document.getElementById('selectedFile').click();
    }
</script>

<div>
    <!--This is ugly but hides the even uglier file selected text-->
    <input type="file" id="selectedFile" accept=".epub" style="display: none;" bind:files/>
    <input type="button" value="Open Ebook" on:click={openFileClick} />
    
{#if fileName != ''}
    <h1 class="bookTitle">{fileName.slice(0,-5)}</h1>
{/if}

</div>


