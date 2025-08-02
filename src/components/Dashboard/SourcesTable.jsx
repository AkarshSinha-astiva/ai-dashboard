import React from "react";

const sources = [
  { source: "youtube.com", used: 62 },
  { source: "bikedekho.com", used: 62 },
  { source: "bikewale.com", used: 57 },
  { source: "reddit.com", used: 29 },
  { source: "hindustantimes.com", used: 22 },
  { source: "wikipedia.org", used: 17 }
];

export default function SourcesTable() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="text-xl font-semibold mb-4">Sources</div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase text-gray-500 border-b">
          <tr>
            <th className="py-2">Source</th>
            <th className="py-2">Used (%)</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 font-medium text-gray-800">{s.source}</td>
              <td className="py-2">{s.used}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}