**1. Open your Organization page in Azure DevOps and complete the following steps:**

   	a. Click the project you want to use. 
   
   	b. Click Pipelines. 
   
   	c. Scroll down and in the “Initialize with a README or gitignore” panel, select the Initialize option.

![Initialize](https://github.com/hclproducts/HCLOneTest-AzureDevops/blob/master/images/first.png)

**2. Setting up the pipeline:**

	a. Click Pipelines
	
	b. Click Create pipeline
	
	c. Click the Use the classic editor to create a pipeline without YAML
	
![Pipeline](https://github.com/hclproducts/HCLOneTest-AzureDevops/blob/master/images/second.png)

	d. Select Azure Repos Git as source and select the corresponding Project, Repository, Branch as per your requirement and click on Continue
	
![Git](https://github.com/hclproducts/HCLOneTest-AzureDevops/blob/master/images/third.png)

	e. Select Empty job. The Empty Job page with Pipeline configuration is displayed
	
![Template](https://github.com/hclproducts/HCLOneTest-AzureDevops/blob/master/images/fourth.png)	

**3. Select the pipeline and complete the following steps:**


	a. Change the name for the build pipeline, if required. 
		
	b. Select the Agent pool for your build pipeline. You can use the agent from the default agent pool or use the one you have installed. 
		
	c. Select the Agent specification for the agent. 
 		
	e. Optionally, change the name of the agent job.

**4. Add a task to the agent job by completing the following steps:**


	a. Click the Add task icon for the agent job. The Add tasks pane is displayed.

	b. Enter hcl in the Search box to search for the tasks defined in the HCL OneTest Azure Devops  Extension. The tasks that you can select are displayed. Depending on the type of test that you have created in the desktop client you can select the type of task. Below is the list of task to select.
		
	HCL OneTest API Azure Task
	HCL OneTest UI Azure Task
	HCL OneTest Performance Azure Task

	c. Select the identified task and then click Add to add the task to the agent job. The selected task    is added to the agent job and displayed with a warning that some settings require attention
	
![Tasks](https://github.com/hclproducts/HCLOneTest-AzureDevops/blob/master/images/fifth.png)	

**5. Complete the settings for the selected task:**

	a. Provide the values for all mandatory parameters.
		
	b. Optionally, expand the Control Options and configure the settings for your test task.

	c. Optionally, expand the Output Variables and configure the settings for your test task.

**6. Select from the following options:**

	a. Click Save to save the configured settings for the task. The task is not queued for a  run. You can save the task to a build pipeline and opt to run the build at a later time. 

	b. Click Save & queue to save the configurations and queue the run in the pipeline. The Run pipeline dialog box is displayed.

**7. Complete the following steps:**

	a. Enter a comment for the test in the Save comment field.

	b. Select the agent that you configured for the test from the Agent pool list.

	c. Select the branch from the Branch/tag list. 

	d. Optionally, add the variables and demands for the task run from the Advanced Options pane. 

	e. Select the Enable system diagnostics check box. 

	f. Click Save and run
