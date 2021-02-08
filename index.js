// Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs');
const generate = require('./utils/generateMarkdown.js')

// Array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What would you like your project title to be?',
        name: 'title'
    },
    {
        type: 'editor',
        message: 'Please enter a description of your project',
        name: `description`
    },
    {
        type: 'editor',
        message: 'Please enter your installation directions',
        name: 'install',
    },
    {
        type: 'editor',
        message: 'Please explain how to use your application',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'Choose which license you want',
        choices: ['Apache-2.0', 'MIT', 'GNU GPU v3.0', "I don't want to choose a liecnse"],
        name: 'license',
    },
    {
        type: 'confirm',
        message: 'Would you like contribution guidelines for your project that will be based on the Contributor Covenant',
        name: 'contributors',
    },
    {
        type: 'input',
        message: 'Please enter the link to your github username',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Please enter the link to your email address',
        name: 'email',
    },
    {
        type: 'editor',
        message: 'Please enter the information about the tests for this application',
        name: 'tests',
    },
];

// Function to write README file
function writeToFile(fileName, dataFile) {
    const filename = fileName;
    const response = dataFile;
    
        fs.writeFile(filename, response, err => {
            if(err) console.log(err);
            else console.log('success');
        });
}

// Function to initialize app
function init() {
    inquirer.prompt([
        questions[0],
        questions[1],
        questions[2],
        questions[3],
        questions[4],
        questions[5],
        questions[6],
        questions[7],
        questions[8],
    ]).then(response => {
        const filename = 'README.md';
        
        const data = {
            title: '',
            description: '',
            install: '',
            usageInfo: '',
            contributors: '',
            license: '',
            licenseSection: '',
            licenseBadge: '',
            licenseLink: '',
            github: '',
            email: '',
            tests: '',
        };

        data.title = response.title;
        data.description = response.description;
        data.install = response.install;
        data.usageInfo = response.usage;

        if (response.contributors == true) {
            data.contributors = generate.renderContributors();
        } else {
            data.contributors = `# Contributors

This product does not allow contributors`;
        };

        data.licenseLink = generate.renderLicenseLink(response.license);
        data.licenseSection = generate.renderLicenseSection(response.license, data.licenseLink);
        data.licenseBadge = generate.renderLicenseBadge(response.license);
        
        data.github = response.github;
        data.email = response.email;
        data.tests = response.tests;


        const md = generate.generateMarkdown(data);

        writeToFile(filename, md);
    })
}

// Function call to initialize app
init();
