import React from "react";
import VisibilityChart from "./components/VisibilityChart";
import IndustryRanking from "./components/IndustryRanking";
import CompanyMentions from "./components/CompanyMentions";
import SourcesTable from "./components/SourcesTable";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-6">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <VisibilityChart />
        </div>
        <div>
          <IndustryRanking />
        </div>
        <div>
          <CompanyMentions />
        </div>
        <div>
          <SourcesTable />
        </div>
      </div>
    </div>
  );
}
