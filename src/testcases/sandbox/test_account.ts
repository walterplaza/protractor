import { Agent, AgentType } from "@data-objects/general/agent";
import TestRunInfo from "@data-objects/general/test-run-info";


describe("test cluster", function () {
 
 let phoneAgent = new Agent();

    it('test cluster', async () => {
        // let agent: Agent = TestRunInfo.cluster.getUserHubAgent(agentType);
        phoneAgent = await TestRunInfo.cluster.getUserHubAgent(AgentType.USERHUB_MANAGER);
       await console.log("USERHUB_MANAGER1");
       await console.log(phoneAgent.email+"/"+phoneAgent.password );
  
       phoneAgent = await TestRunInfo.cluster.getUserHubAgent(AgentType.USERHUB_ADMINISTRATOR);
       await console.log("USERHUB_ADMINISTRATOR");
       await console.log(phoneAgent.email+"/"+phoneAgent.password );

       phoneAgent = await TestRunInfo.cluster.getUserHubAgent(AgentType.USERHUB_AGENT1);
       await console.log("USERHUB_AGENT1");
       await console.log(phoneAgent.email+"/"+phoneAgent.password );

       phoneAgent = await TestRunInfo.cluster.getUserHubAgent(AgentType.USERHUB_AGENT2);
       await console.log("USERHUB_AGENT1");
       await console.log(phoneAgent.email+"/"+phoneAgent.password );
 
       phoneAgent = await TestRunInfo.cluster.getUserHubAgent(AgentType.USERHUB_CUSER);
       await console.log("USERHUB_CUSER");
       await console.log(phoneAgent.email+"/"+phoneAgent.password );
 
    });

  
});