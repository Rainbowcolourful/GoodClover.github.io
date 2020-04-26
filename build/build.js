// Get the modules
const marked = require("marked");
const fs = require("fs");

const build_data = require("./build_data.json");

// Set options, see https://marked.js.org/#/USING_ADVANCED.md
marked.setOptions({
    ...build_data.options,
    //sanitize: false, // DEPRECATED
    renderer: new marked.Renderer() // See https://marked.js.org/#/USING_PRO.md
});

// Read template
var template = fs.readFileSync("./template.html", "utf8")

// Compile the code
for (var conversion of build_data.conversions) {
    fs.readFile("../"+conversion.markdown, "utf8", (err, data) => {
        if (err) throw err;

        // Convert the markdown into html
        data = marked(data);

        // Add tamplate data
        data = template.replace("DATA", data)

        // Write it to a file
        fs.writeFile("../"+conversion.html, data, (err) => {
            if (err) throw err;
            console.log(`${conversion.markdown} => ${conversion.html}`);
        });

    });
};
