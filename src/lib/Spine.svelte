<script>
    import { contentPath } from "./stores";
    import {parseSpine} from './spineParse';

    let content = '';
    contentPath.subscribe((s) => content = s);
</script>

<div>
    content path: {content}
</div>
