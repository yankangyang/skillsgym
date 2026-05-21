import { readRepoJson } from "../../lib/content.js";

interface DrillSeed {
  category: string;
  subcategory: string;
  difficulty: number;
}

export async function getDrillCatalog() {
  const percentageDrills = await readRepoJson<DrillSeed[]>(
    "content/consulting/drills/mental_math/percentages.json"
  );

  return {
    vertical: "consulting",
    categories: [
      {
        id: "mental-math",
        name: "Mental Math",
        totalQuestions: percentageDrills.length,
        subcategories: [...new Set(percentageDrills.map((item) => item.subcategory))]
      },
      {
        id: "behavioral",
        name: "Behavioral",
        totalQuestions: 3,
        subcategories: ["mckinsey_pei"]
      }
    ]
  };
}

