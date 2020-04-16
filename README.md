**About the task **
After you add the HCL OneTest Azure Devops Extension as an extension in your Azure DevOps organization, you can use an existing pipeline or create a new one to add the HCL OneTest desktop client test tasks. You can install an agent or the one that you have installed in your default agent pool. You can add the HCL OneTest desktop client tests as tasks to your agent job, configure the task, and then run the task in the Azure DevOps pipeline.

**Before you begin:** Clone the files given the Repositories link. Upload them to your repository.
**Procedure** 
**1. Open your Organization page in Azure DevOps and complete the following steps:**
   	a. Click the project you want to use. 
    	b. Click Pipelines. 
    	c. Click Use the classic editor to create a pipeline without YAML.
    	d. Select the repository where you have uploaded the HCL OneTest Azure Devops Extension and               complete the addition of the repository.
    	e. Search for the Node.js with gulp template, select it, and click    Apply. The Node.js with gulp     template page is displayed.

**2. Select the pipeline and complete the following steps: **
     	a. Change the name for the build pipeline, if required. 
b. Select the Agent pool for your build pipeline. You can use the agent from the default agent pool or use the one you have installed. 
c. Select the Agent specification for the agent. 
d. Optionally, select the tasks from the list that are not required in your job and remove them.
 	e. Optionally, change the name of the agent job.

**3. Add a task to the agent job by completing the following steps: **
a. Click the Add task icon for the agent job. The Add tasks pane is displayed.
b. Enter hcl in the Search box to search for the tasks defined in the HCL OneTest Azure Devops  Extension. The tasks that you can select are displayed. Depending on the type of test that you have created in the desktop client you can select the type of task. Below is the list of task to select.
    HCL OneTest API Azure Task
    HCL OneTest UI Azure Task
    HCL OneTest Performance Azure Task
c. Select the identified task and then click Add to add the task to the agent job. The selected task    is added to the agent job and displayed with a warning that some settings require attention

**4. Complete the settings for the selected task:**
            	a. Provide the values for all mandatory parameters.
 	c. Optionally, expand the Control Options and configure the settings for your test task.
d. Optionally, expand the Output Variables and configure the settings for your test task.

**5. Select from the following options:  **
a. Click Save to save the configured settings for the task. The task is not queued for a  run. You can save the task to a build pipeline and opt to run the build at a later time. 
b. Click Save & queue to save the configurations and queue the run in the pipeline. The Run pipeline dialog box is displayed.

**6. Complete the following steps: **
a. Enter a comment for the test in the Save comment field.
b. Select the agent that you configured for the test from the Agent pool list.
c. Select the branch from the Branch/tag list. 
d. Optionally, add the variables and demands for the task run from the Advanced Options pane. 
e. Select the Enable system diagnostics check box. 
f. Click Save and run
