import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');
import path = require('path');
import os = require('os');
import tr = require('azure-pipelines-task-lib/toolrunner');
var uuidV4 = require('uuid/v4');

async function run() {
    try {
        /*
        HCL OneTest API parameters.
        */
        //API settings
        const productpath: string = tl.getInput('productpath', true);
        const projectdir: string = tl.getInput('projectdir', true);
        var projectname: string = tl.getInput('projectname', true);
        const environment: string = tl.getInput('environment', true);
        const tests: string = tl.getInput('tests', true);
       // const resultpublishers: string = tl.getInput('resultpublishers', false);
       // const paramfile: string = tl.getInput('parameterfile', false);

        //Script parameters
        var script = '';
        var workingDirectory = '';
        var failOnStderr = false;

        tl.setResourcePath(path.join(__dirname, 'task.json'));
         
        if(projectname.includes('.ghp')){

        }else{
            projectname = projectname+'.ghp';
        }
        //Script formation
		if (process.platform == 'linux')
			{
				script = 'cd ' + '"'+productpath+'"' + '\n'
					+ './RunTests' 
					+ ' -project ' + '"' + projectdir + '/' + projectname + '"'
					+ ' -run ' + '"' + tests + '"'
					+ ' -environment ' + environment;
        
			}
		else 
		if (process.platform == 'win32')
			{ 
				script = 'cd ' + '"'+productpath+'"' + '\n'
					+ './RunTests' 
					+ ' -project ' + '"' + projectdir + '\\' + projectname + '"'
					+ ' -run ' + '"' + tests + '"'
					+ ' -environment ' + environment;
			}
		workingDirectory = projectdir;
        /*
            Most of the rest of this is based on the command line example in the Azure Devops Tasks Examples Repo.
            https://github.com/Microsoft/azure-pipelines-tasks/tree/master/Tasks/CmdLineV2
        */

        // Write the script to disk.
        tl.assertAgent('2.115.0');
        let tempDirectory = tl.getVariable('agent.tempDirectory');
        tl.checkPath(tempDirectory, `${tempDirectory} (agent.tempDirectory)`);
        let filePath = path.join(tempDirectory, uuidV4() + '.ps1');
        await fs.writeFileSync(
            filePath,
            script, // Don't add a BOM. It causes the script to fail on some operating systems (e.g. on Ubuntu 14).
            { encoding: 'utf8' });

        // Print one-liner scripts.
		console.log(script);
        if (script.indexOf('\n') < 0 && script.toUpperCase().indexOf('##VSO[') < 0) {
            console.log(script);
        }

        // Create the tool runner.
        console.log('========================== Starting Command Output ===========================');
        let bash = tl.tool(tl.which('powershell', true))
            .arg(filePath);
        let options = <tr.IExecOptions><unknown>{
            cwd: workingDirectory,
            failOnStdErr: false,
            errStream: process.stdout,
            outStream: process.stdout,
            ignoreReturnCode: true
        };

        // Listen for stderr.
        let stderrFailure = false;
        if (failOnStderr) {
            bash.on('stderr', (data) => {
                stderrFailure = true;
            });
        }

        // Run bash.
        let exitCode: number = await bash.exec(options);

        let result = tl.TaskResult.Succeeded;

        // Fail on exit code.
        if (exitCode !== 0) {
            tl.error(tl.loc('JS_ExitCode', exitCode));
            result = tl.TaskResult.Failed;
        }

        // Fail on stderr.
        if (stderrFailure) {
            tl.error(tl.loc('JS_Stderr'));
            result = tl.TaskResult.Failed;
        }

        tl.setResult(result, "", true);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message || 'run() failed', true);
    }
}

run();