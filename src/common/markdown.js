export const parser = (content) => {
    if (!content) return content

    //ul
    content = content.replace(/^\s*\n\*/gm, '<ul>\n*');
    content = content.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    content = content.replace(/^\*(.+)/gm, '<li>$1</li>');

    //h
    content = content.replace(/[\#]{3}(.+)/g, '<h6>$1</h6>');
    content = content.replace(/[\#]{2}(.+)/g, '<h5>$1</h5>');
    content = content.replace(/[\#]{1}(.+)/g, '<h4>$1</h4>');

    //links
    content = content.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');

    //font styles
    content = content.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    content = content.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');

    //p
    content = content.replace(/^\s*(\n)?(.+)/gm, function(m){
        return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
    });

    return content;
}
