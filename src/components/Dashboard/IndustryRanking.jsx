import React from "react";

const rows = [
  { brand: "Honda", position: 3.2, sentiment: 73, visibility: 72 },
  { brand: "Bajaj", position: 3.3, sentiment: 71, visibility: 47 },
  { brand: "Classic 350", position: 3.3, sentiment: 71, visibility: 47 },
  { brand: "KTM", position: 3.5, sentiment: 69, visibility: 45 },
  { brand: "TVS", position: 3.8, sentiment: 70, visibility: 42 }
];

export default function IndustryRanking() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="text-xl font-semibold mb-4">Industry Ranking</div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase text-gray-500 border-b">
          <tr>
            <th className="py-2">Brand</th>
            <th className="py-2">Position</th>
            <th className="py-2">Sentiment</th>
            <th className="py-2">Visibility</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 font-medium text-gray-800">{row.brand}</td>
              <td className="py-2">{row.position}</td>
              <td className="py-2">{row.sentiment}%</td>
              <td className="py-2">{row.visibility}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}