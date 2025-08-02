import React from "react";

const mentions = [
  "What are top motor cycle brand in India?",
  "Give me the list top launching motorcycles in India?",
  "सिंगल मोटरसाइकिल्स वितरक लिस्ट साझा करें",
  "Which cruiser motorcycle has best mileage in India?"
];

export default function CompanyMentions() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow border">
      <div className="text-xl font-semibold mb-4">Recent 🅱️ Bajaj Mentions</div>
      <ul className="space-y-2">
        {mentions.map((text, i) => (
          <li key={i} className="text-gray-700 bg-gray-100 p-2 rounded">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}