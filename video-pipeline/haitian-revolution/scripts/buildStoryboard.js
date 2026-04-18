#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const visualStyle = "Serious cinematic historical reconstruction, realistic 18th–19th century Caribbean setting, naturalistic lighting, smoke, mud, period-correct uniforms, no fantasy elements, no modern objects.";
const continuity = {
  toussaint: "Toussaint Louverture: middle-aged Black Haitian commander, disciplined bearing, blue-and-red officer coat inspired by period uniforms, bicorne hat, calm strategic expression.",
  dessalines: "Jean-Jacques Dessalines: imposing Black Haitian general, stern expression, weathered military coat, commanding voice and posture.",
  christophe: "Henri Christophe: structured and formal military presence, upright posture, dark period uniform with officer sash, deliberate movements.",
};

const beats = [
  ["Saint-Domingue Before Revolt",1791,"French colony of Saint-Domingue produces immense wealth through plantation slavery; social hierarchy is rigid and violent."],
  ["Plantation Regime",1791,"Enslaved Africans endure forced labor, surveillance, and punishment under plantation discipline."],
  ["Winds of Revolution",1791,"News of the French Revolution and rights debates reaches the colony, heightening tensions among whites, free people of color, and the enslaved."],
  ["Gathering Networks",1791,"Enslaved organizers build communication networks across plantations in the northern plain."],
  ["Bois Caïman Oath",1791,"At Bois Caïman in August 1791, leaders gather in a secret ceremony linked in Haitian memory to coordinated resistance."],
  ["Signal to Rise",1791,"Plans are synchronized for a mass uprising in the North Province."],
  ["Insurrection Begins",1791,"In late August 1791, plantations burn and the large-scale slave uprising begins."],
  ["Colonial Shock",1791,"Planters and colonial militias struggle to contain coordinated attacks."],
  ["Armed Camps",1791,"Rebel camps form with improvised command structures and captured supplies."],
  ["Escalating War",1791,"Conflict expands into a multi-sided civil and imperial war."],

  ["Competing Claims",1792,"French commissioners arrive while local factions contest authority and citizenship rights."],
  ["Free Colored Militias",1792,"Free men of color and Black fighters organize armed units amid shifting alliances."],
  ["European Rivalry",1793,"Spain and Britain exploit the crisis as war spreads across the colony."],
  ["Toussaint Emerges",1793,"Toussaint Louverture rises as a disciplined commander with operational skill."],
  ["Campaign Mobility",1793,"Mounted scouts and small columns move through mountain corridors and cane fields."],
  ["Abolition Decrees",1793,"French commissioners in Saint-Domingue proclaim emancipation in parts of the colony."],
  ["French Abolition Confirmed",1794,"In 1794, revolutionary France abolishes slavery in its colonies."],
  ["Toussaint Changes Sides",1794,"Toussaint aligns with Republican France after abolition, redirecting his campaign."],
  ["War with Spain",1794,"Forces loyal to Toussaint push against Spanish positions on Hispaniola."],
  ["Frontline Logistics",1794,"Supply lines, powder, and food determine survival as much as battle."],

  ["War with Britain",1795,"British expeditionary forces seize ports but face entrenched resistance inland."],
  ["Attrition and Disease",1795,"Tropical disease and attrition weaken European campaigns."],
  ["Treaty of Basel Context",1795,"Spain cedes Santo Domingo to France by treaty, altering the strategic map."],
  ["Black and Mixed Leadership",1796,"Black and mixed-race officers expand command responsibility in Republican ranks."],
  ["Toussaint Consolidates",1796,"Toussaint centralizes authority and enforces discipline in his army."],
  ["Marches Through the Plain",1797,"Columns maneuver through sugar districts to isolate enemy garrisons."],
  ["British Withdrawal",1798,"Britain begins withdrawing after years of costly fighting."],
  ["Control Expands",1798,"Toussaint's administration extends control over most of the colony."],
  ["Constitutional Ambition",1801,"Louverture issues the 1801 Constitution, asserting autonomy while naming himself governor for life."],
  ["Move into Santo Domingo",1801,"Toussaint occupies Santo Domingo and abolishes slavery there."],

  ["Napoleon Responds",1801,"Napoleon Bonaparte dispatches a major expedition under General Leclerc to restore French authority."],
  ["French Landing",1802,"French fleets and troops land in early 1802 at key coastal points."],
  ["Henri Christophe's Defense",1802,"Henri Christophe coordinates defensive withdrawals and scorched-earth tactics in northern towns."],
  ["Cap-Haïtien in Flames",1802,"Retreating Haitian forces burn strategic sites rather than surrender intact ports."],
  ["Mountain Resistance",1802,"Haitian commanders shift to terrain advantage, ambush, and fragmented fronts."],
  ["Crête-à-Pierrot Campaign",1802,"Heavy fighting at Crête-à-Pierrot demonstrates tactical resilience against French assaults."],
  ["Negotiations and Pressure",1802,"Leclerc combines military pressure with negotiated promises to split commanders."],
  ["Toussaint's Surrender",1802,"Toussaint agrees to retire after assurances of safety."],
  ["Capture by Deception",1802,"In June 1802, Toussaint Louverture is seized and deported to France."],
  ["Fort de Joux",1802,"Toussaint is imprisoned in Fort de Joux in the Jura mountains."],

  ["Threat of Re-enslavement",1802,"News and policy signals indicating restoration of slavery reignite resistance."],
  ["Dessalines Reenters War",1802,"Jean-Jacques Dessalines returns to open war against French expeditionary forces."],
  ["Christophe Rejoins",1802,"Henri Christophe aligns in the renewed anti-French campaign."],
  ["War of Survival",1802,"The struggle becomes existential: independence or re-enslavement."],
  ["Leclerc Dies",1802,"General Leclerc dies as disease devastates French ranks; Rochambeau assumes command."],
  ["Rochambeau's Brutality",1802,"French repression intensifies under Rochambeau, hardening Haitian resolve."],
  ["Toussaint's Death",1803,"Toussaint Louverture dies in captivity in April 1803."],
  ["Indigenous Army Forms",1803,"Dessalines unifies forces under the Armée indigène for decisive operations."],
  ["Campaign of 1803",1803,"Haitian forces target forts and supply routes, squeezing French coastal holdouts."],
  ["Alliance Building",1803,"Former rivals coordinate under common command for final victory."],

  ["Northern Offensive",1803,"Assaults intensify around Cap-Français and surrounding strongpoints."],
  ["Discipline and Drill",1803,"Columns practice coordinated movement, volleys, and bayonet charges."],
  ["Field Command",1803,"Dessalines directs operations while sub-commanders execute sector assaults."],
  ["Henri Christophe in Action",1803,"Christophe leads organized troops in pressure operations against French positions."],
  ["Approach to Vertières",1803,"Both armies prepare around Vertières, a key defensive line near Cap-Français."],
  ["Battle of Vertières Opens",1803,"On 18 November 1803, Haitian forces attack French fortifications at Vertières."],
  ["Capois at the Front",1803,"Officers and infantry sustain repeated assaults despite intense artillery fire."],
  ["French Line Falters",1803,"Coordinated Haitian pressure breaks French defensive capacity."],
  ["Victory at Vertières",1803,"The Battle of Vertières ends in Haitian victory, decisive for independence."],
  ["French Evacuation",1803,"Rochambeau agrees to evacuate remaining French forces from Cap-Français."],

  ["From War to Statehood",1803,"Commanders transition from wartime coalition to founding leadership."],
  ["Gonaïves Assembly",1804,"Leaders gather in Gonaïves to formalize sovereignty."],
  ["Independence Declared",1804,"On 1 January 1804, Dessalines proclaims the independence of Haiti."],
  ["Name Restored",1804,"The new state adopts the name Haiti, drawn from the island's Indigenous Taíno/Arawak heritage."],
  ["Army Oath",1804,"Commanders swear to defend freedom and prevent return to colonial slavery."],
  ["Continental Impact",1804,"Haiti emerges as the first independent Black republic and a transformative event in Atlantic history."],
  ["Memory of Sacrifice",1804,"The revolution's human cost is acknowledged: towns destroyed, families torn, thousands dead."],
  ["Legacy of Leaders",1804,"Toussaint Louverture, Dessalines, and Henri Christophe remain central figures of strategy and state formation."],
  ["Closing Reflection",1804,"The Haitian Revolution demonstrates that enslaved people could defeat imperial armies and found a sovereign nation."],
  ["End Credits / Sources",1804,"Final credits list historical sources, archival references, and production acknowledgements."],
];

const durations = beats.map((_, idx) => {
  if (idx % 6 === 0 || idx % 6 === 1) return 10;
  return 9;
});

if (beats.length !== durations.length) throw new Error('beats/durations mismatch');

const scenes = beats.map(([title, year, narration], idx) => {
  const id = `scene-${String(idx + 1).padStart(3, '0')}`;
  const leader = idx % 3 === 0 ? continuity.toussaint : idx % 3 === 1 ? continuity.dessalines : continuity.christophe;
  return {
    id,
    chronologicalOrder: idx + 1,
    year,
    title,
    historicalContext: narration,
    narrationText: narration,
    visualPrompt: `${visualStyle} Wide-to-medium shot. Event: ${title}.`,
    characterPrompt: `Primary continuity character focus: ${leader}`,
    environmentPrompt: `Saint-Domingue/Haiti period environment, accurate terrain and architecture for year ${year}; smoke, humidity, dirt roads, colonial forts or plantations as appropriate.`,
    transitionInstructions: idx === 0 ? "Fade in from black with low drum ambience." : idx === beats.length - 1 ? "Slow fade to black and hold 2 seconds." : "Cross-dissolve with subtle battlefield ambience carryover.",
    estimatedDurationSec: durations[idx],
    assetPlaceholders: {
      generatedClip: `assets/generated/scenes/${id}.mp4`,
      fallbackImage: `assets/local/images/${id}.jpg`,
      narrationAudio: `assets/generated/voiceover/${id}.wav`,
    },
  };
});

const total = scenes.reduce((acc, s) => acc + s.estimatedDurationSec, 0);
const storyboard = {
  project: {
    id: "haitian-revolution-documentary",
    title: "Haiti 1791–1804: Revolution and Independence",
    targetDurationSec: total,
    targetDurationLabel: `${Math.floor(total / 60)}m ${total % 60}s`,
    sceneCount: scenes.length,
    fps: 24,
    resolution: "1920x1080",
    styleGuardrails: [
      "Serious documentary tone",
      "No anachronisms or modern objects",
      "No fantasy visual motifs",
      "Consistent character identity across scenes",
    ],
  },
  timelineSourceNote: "Chronology follows standard historical consensus for Haitian Revolution milestones (1791-1804).",
  scenes,
};

const outFile = path.resolve(__dirname, '../storyboard/haitian-revolution.storyboard.json');
fs.writeFileSync(outFile, JSON.stringify(storyboard, null, 2));
console.log(`Wrote storyboard to ${outFile}`);
console.log(`Scenes: ${scenes.length}, total duration: ${total}s`);
