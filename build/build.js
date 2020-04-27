// Get the modules
const marked = require("marked");
const fs = require("fs");
const yaml = require("js-yaml");

// Load the build data
const build_data = require("./build_data.json");

// Set options, see https://marked.js.org/#/USING_ADVANCED.md
marked.setOptions({
    ...build_data.options,
    // sanitize: false, // DEPRECATED
    renderer: new marked.Renderer() // See https://marked.js.org/#/USING_PRO.md
});

// Read template
var template = fs.readFileSync("./template.html", "utf8");

// Compile the code
for (var conversion of build_data.pages) {
    // Load the file
    var markdown  = fs.readFileSync(`../${conversion}.md`, "utf8");

    // Load the metadata
    var meta =  yaml.safeLoad(markdown.slice(4, markdown.slice(4).indexOf("---")+3));
    meta = {...build_data.default_meta, ...meta};

    // Remove metadata from markdown
    markdown = markdown.slice(markdown.slice(4).indexOf("---")+7);

    // Replace metadata into markdown
    for (var i = 0; i<markdown.length; i++) {
        var sly = markdown.slice(i);
        if (sly.slice(0, 9) == "[_meta_: ") {
            markdown = markdown.slice(0, i) + meta[sly.slice(9, sly.indexOf("]"))] + sly.slice(sly.indexOf("]")+1)
        };
    };

    // Convert the markdown into html
    var html = marked(markdown);

    // Add template data
    html = template.replace("META_BODY", html);
    html = html.replace("META_TITLE", meta.Title);
    html = html.replace("META_CSS", `./css/${meta.Style}.css`);
    for (var i in meta) {
        if (meta[i].replace(" ", "") != "") {
            html = html.replace("METAS", `<meta name="${i.toLowerCase()}" content="${meta[i]}"/>\n        METAS`);
        };
    };
    html = html.replace("\n        METAS", "");

    // Write the html to a file
    fs.writeFile(`../${conversion}.html`, html, (err) => {
        if (err) throw err;
        console.log(`${conversion}.md => ${conversion}.html`);
    });
};
