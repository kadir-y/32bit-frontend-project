import { createContext, useContext, useState } from "react";

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);

  function addCampaign(campaign) {
    setCampaigns([
      ...campaigns,
      campaign
    ]);
  };
  function removeCampaign(id) {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };
  function includes(id) {
    return Boolean(campaigns.find(c => c.id === id));
  };

  const value = {
    addCampaign,
    removeCampaign,
    includes,
    campaigns
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
