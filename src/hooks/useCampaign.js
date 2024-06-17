import { createContext, useContext, useState } from "react";

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);

  function applyCampaign(campaign) {
    console.log("appl")
    setCampaigns([...campaigns, campaign]);
  };

  const value = {
    campaigns,
    applyCampaign
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  return useContext(CampaignContext);
}
