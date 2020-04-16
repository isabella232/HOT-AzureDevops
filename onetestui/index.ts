import tl = require('azure-pipelines-task-lib/task');
import fs = require('fs');
import path = require('path');
import os = require('os');
import tr = require('azure-pipelines-task-lib/toolrunner');
var uuidV4 = require('uuid/v4');

async function run() {
    try {
        /*
        HCL OneTest UI parameters.
        */
       const type: string = tl.getInput('selectedOption', true);
       const productpath: string = tl.getInput('productpath', true);
       const projectdir: string = tl.getInput('projectdir', true);
var vmargs: string = tl.getInput('vmargs', false);


        var script = '';
        var workingDirectory = '';
        var failOnStderr = false;

        tl.setResourcePath(path.join(__dirname, 'task.json'));

        if(type == 'trad'){
            //Traditional settings
            const testsuiteName: string = tl.getInput('testsuite', true);
            const logformat: string = tl.getInput('logformat', true);
            const itercount: string = tl.getInput('itercount',false);
            const userargs: string = tl.getInput('userargs',false);

            // Get inputs.
            failOnStderr = false;
            var iterations = ' ';
            var args = '';
            if(itercount != null){
                iterations = ' -iterationCount '+itercount;
            }
            if(userargs != null ){
                args = ' -args '+userargs+' ';
            }
            var javaLocation = '';
            //Script formation
			if (process.platform == 'linux') {
				console.log("javaLocation%%%%%%%%%%%%%%%%%%%%%% "+javaLocation)
				javaLocation = productpath+'/jdk/jre/bin/java'
            script = 'cd ' + '"'+productpath+'/jdk/jre/bin/"' + '\n'+'./java.exe -jar "'+productpath+'/FunctionalTester/bin/hcl_ft.jar"' 
            + ' -datastore ' + projectdir 
            + ' -playback ' + testsuiteName 
            //+ ' -rt.log_format ' + logformat 
            //+ ' -rt.bring_up_logviewer false' 
            + iterations 
            + ' -execmode ado' 
            + args;
			}
			else 
			if (process.platform == 'win32') {
				javaLocation = productpath+'\\jdk\\jre\\bin\\java.exe'
				console.log("javaLocation%%%%%%%%%%%%%%%%%%%%%% "+javaLocation)
                 script = 'cd ' + '"'+productpath+'\\jdk\\jre\\bin\\"' + '\n'+'./java.exe -jar "'+productpath+'\\FunctionalTester\\bin\\hcl_ft.jar"' 
            + ' -datastore ' + projectdir 
            + ' -playback ' + testsuiteName 
            //+ ' -rt.log_format ' + logformat 
            //+ ' -rt.bring_up_logviewer false' 
            + iterations 
            + ' -execmode ado' 
            + args;
				}
            workingDirectory = projectdir;
        }else{
            //WebUI settings
            const imshared: string = tl.getInput('imshared', true);
            const workspace: string = tl.getInput('workspace', true);
            const project: string = tl.getInput('project', true);
            const suite: string = tl.getInput('suite', true);
            //const varfile: string = tl.getInput('varfile', false);
            //const configfile: string = tl.getInput('configfile', false);

            //Script formation
			if (process.platform == 'linux') {
            script = 'cd ' + '"'+productpath+'/cmdline"' + '\n' + 'java -cp cmdlineexecute.jar com.ibm.rational.test.lt.cmdlineexecute.CmdLineExecute'
            + ' -workspace ' + '"'+workspace+'"'
            + ' -project ' + '"'+project+'"'
            + ' -eclipsehome ' + '"'+productpath+'"'
            + ' -plugins ' + '"'+imshared+'/plugins"';
			}
			else
			if (process.platform == 'win32') {
			script = 'cd ' + '"'+productpath+'\\cmdline"' + '\n' + 'java -cp cmdlineexecute.jar com.ibm.rational.test.lt.cmdlineexecute.CmdLineExecute'
            + ' -workspace ' + '"'+workspace+'"'
            + ' -project ' + '"'+project+'"'
            + ' -eclipsehome ' + '"'+productpath+'"'
            + ' -plugins ' + '"'+imshared+'\\plugins"';
			}
			if(suite.indexOf(".xml")!=-1)
			{
				script = script.concat(' -aftsuite '+'"'+ suite +'"')
			}
			else
			{
				script = script.concat(' -suite '+'"'+ suite +'"')
			}
			if(vmargs != null)
		    {
				console.log("vmargs  ***********inside if***********8 "+vmargs)
				script = script.concat(' -vmargs '+'"'+ vmargs +'"')
			}	
            workingDirectory = projectdir;
        }
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
        console.log(script);
        // Print one-liner scripts.
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