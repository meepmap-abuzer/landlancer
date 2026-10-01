const marks={
 websites:['      .----------.','      |  []  --  |','      |  --  --  |','      |__________|','     /____________\\'],
 'telegram-mini-apps':['        .------.','        |  ..  |','        | [--] |','        |  --  |','        |  __  |','        \'------\''],
 crm:['     .---.    .---.','     | + |----| + |','     \'---\'    \'---\'','        \\      /','         .----.','         | ++ |','         \'----\''],
 automation:['        [ . ]','           |','     .-----+-----.','     |           |','   [ . ]       [ . ]','     \'-----+-----\'']
};
export function asciiMotif(kind){return `<pre class="service-ascii" data-motif="${kind}" aria-hidden="true">${(marks[kind]||marks.websites).join('\n')}</pre>`;}
