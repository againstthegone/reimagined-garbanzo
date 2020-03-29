let fs = require('fs');
let git = require('nodegit');

(async function installCovid19() {
    if (!fs.existsSync('./COVID-19')) {
        await git.Clone.clone("https://github.com/CSSEGISandData/COVID-19", "COVID-19");
    } else {
        const repository = await git.Repository.open("COVID-19");
        await repository.fetch('origin');
        await repository.mergeBranches('master', 'origin/master');
    }
})();