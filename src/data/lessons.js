const mkLesson = (base) => ({
  ...base,
  coreConcepts: base.coreConcepts || [],
  steps: base.steps || [],
  commonMistakes: base.commonMistakes || [],
  practicalExercises: base.practicalExercises || [],
  challengeExercises: base.challengeExercises || [],
  quiz: base.quiz || [],
  relatedTopics: base.relatedTopics || []
});

export const lessons = [
  mkLesson({
    id: 'cyber-cia-triad',
    section: 'Cybersecurity',
    title: 'CIA Triad Fundamentals',
    definitionFr: "Le triptyque CIA (Confidentialité, Intégrité, Disponibilité) est le modèle de base pour protéger les systèmes d'information.",
    conceptHt: 'CIA vle di done dwe rete sekrè, egzak, epi disponib lè biznis la bezwen yo.',
    whyItMatters: 'Security controls fail when teams optimize one pillar and ignore the others.',
    deepExplanation: 'Confidentiality uses access control and encryption; integrity relies on hashes and change control; availability requires redundancy, backups, and monitoring.',
    steps: ['Classify data sensitivity.', 'Map threats against each CIA pillar.', 'Select controls and metrics.', 'Review incidents and improve controls.'],
    code: `# Verify file integrity
sha256sum payroll.csv

# Restrict file access
chmod 640 payroll.csv`,
    coreConcepts: ['Data classification', 'Least privilege', 'Backup strategy', 'Integrity verification'],
    commonMistakes: ['Assuming backups are tested', 'Ignoring insider threats', 'No integrity baseline'],
    practicalExercises: ['Create a CIA map for your home lab services.', 'Define one preventive and one detective control for each pillar.'],
    challengeExercises: ['Design a CIA security plan for a school LMS under ransomware risk.'],
    quiz: ['Which pillar is most directly improved by hashing?', 'Give one example of an availability control.'],
    summary: 'CIA is the foundation of strategic and technical security decisions.',
    relatedTopics: ['Risk assessment', 'SOC fundamentals'],
    nextLesson: 'cyber-threat-modeling'
  }),
  mkLesson({
    id: 'cyber-threat-modeling', section: 'Cybersecurity', title: 'Threat Modeling with STRIDE',
    definitionFr: 'La modélisation des menaces identifie comment un attaquant pourrait compromettre un système avant sa mise en production.',
    conceptHt: 'Threat modeling ede w prevwa atak yo pou w ka bloke yo bonè.',
    whyItMatters: 'Fixing architecture flaws early is cheaper than patching incidents later.',
    deepExplanation: 'STRIDE covers spoofing, tampering, repudiation, information disclosure, denial of service, and privilege escalation.',
    steps: ['Draw data flow diagram.', 'Identify trust boundaries.', 'Map STRIDE threats per component.', 'Add mitigations and owners.'],
    code: `# Example checklist in markdown
- [ ] Identify authentication boundary
- [ ] Validate all external input
- [ ] Log security events`,
    coreConcepts: ['Attack surface', 'Trust boundaries', 'Risk scoring'],
    commonMistakes: ['Skipping third-party dependencies', 'No mitigation owner'],
    practicalExercises: ['Threat-model a login API and propose controls.'],
    challengeExercises: ['Build a STRIDE matrix for a file-sharing app.'],
    quiz: ['What does the "R" in STRIDE represent?'],
    summary: 'Threat modeling transforms security from reactive to proactive.',
    relatedTopics: ['Secure coding', 'Web security'],
    nextLesson: 'cyber-iam'
  }),
  mkLesson({
    id: 'cyber-iam', section: 'Cybersecurity', title: 'Identity and Access Management (IAM)',
    definitionFr: 'IAM regroupe les politiques et technologies qui garantissent que les bonnes personnes ont le bon accès.',
    conceptHt: 'IAM kontwole kiyès ki ka antre nan sistèm nan ak sa yo ka fè.',
    whyItMatters: 'Most breaches involve credential misuse or privilege abuse.',
    deepExplanation: 'Modern IAM combines MFA, SSO, RBAC, lifecycle provisioning, and continuous verification.',
    steps: ['Create role matrix.', 'Enable MFA.', 'Automate onboarding/offboarding.', 'Audit privileged access.'],
    code: `# Linux: list users with shell access
awk -F: '$7 ~ /bash|zsh/ {print $1}' /etc/passwd`,
    coreConcepts: ['MFA', 'RBAC', 'Least privilege', 'Access reviews'],
    commonMistakes: ['Shared admin accounts', 'No offboarding automation'],
    practicalExercises: ['Design roles for SOC analyst, engineer, and manager.'],
    challengeExercises: ['Write an IAM policy for a cloud startup with contractors.'],
    quiz: ['What is the difference between authentication and authorization?'],
    summary: 'IAM reduces lateral movement and limits blast radius.',
    relatedTopics: ['Cloud basics', 'Blue Team basics'],
    nextLesson: 'cyber-vuln-management'
  }),
  mkLesson({
    id: 'cyber-vuln-management', section: 'Cybersecurity', title: 'Vulnerability Management Lifecycle',
    definitionFr: 'La gestion des vulnérabilités est un processus continu de détection, priorisation, correction et vérification.',
    conceptHt: 'Se pa sèlman scan: se jwenn risk, ranje yo, epi verifye yo.',
    whyItMatters: 'Unpatched exposures are a top initial access path.',
    deepExplanation: 'Combine authenticated scanning, asset context, exploit intelligence, patch SLAs, and verification scans.',
    steps: ['Inventory assets.', 'Run authenticated scans.', 'Prioritize by risk + exposure.', 'Patch and validate.', 'Report KPIs.'],
    code: `# Ubuntu update cycle
sudo apt update
sudo apt list --upgradable
sudo apt upgrade -y`,
    coreConcepts: ['CVSS vs business risk', 'Patch SLA', 'Exception process'],
    commonMistakes: ['Scanning without credentials', 'Ignoring internet-facing assets'],
    practicalExercises: ['Build a patch calendar for 30-day SLA.'],
    challengeExercises: ['Define risk acceptance rules for legacy systems.'],
    quiz: ['Why can CVSS alone be insufficient for prioritization?'],
    summary: 'Strong vulnerability management ties technical findings to business risk.',
    relatedTopics: ['Operating systems', 'SOC fundamentals'],
    nextLesson: 'cyber-incident-response'
  }),
  mkLesson({
    id: 'cyber-incident-response', section: 'Cybersecurity', title: 'Incident Response Lifecycle',
    definitionFr: 'La réponse à incident couvre préparation, détection, confinement, éradication, récupération et retour d’expérience.',
    conceptHt: 'IR se plan aksyon pou limite domaj lè gen atak.',
    whyItMatters: 'Speed and coordination determine business impact during a breach.',
    deepExplanation: 'Good IR includes playbooks, communication trees, forensic readiness, and post-incident corrective actions.',
    steps: ['Prepare playbooks.', 'Detect and triage alerts.', 'Contain affected systems.', 'Eradicate root cause.', 'Recover services.', 'Conduct lessons learned.'],
    code: `# Capture active connections during triage
ss -tulpen

# Collect process list
ps aux --sort=-%cpu | head`,
    coreConcepts: ['Triage severity', 'Containment strategy', 'Postmortem'],
    commonMistakes: ['No legal/comms coordination', 'Destroying evidence too early'],
    practicalExercises: ['Simulate phishing incident timeline.'],
    challengeExercises: ['Create an IR playbook for ransomware.'],
    quiz: ['What comes immediately after containment in the lifecycle?'],
    summary: 'IR maturity is built through rehearsal, not only documentation.',
    relatedTopics: ['Digital forensics basics', 'Blue Team basics'],
    nextLesson: 'linux-file-permissions'
  }),
  mkLesson({ id:'linux-file-permissions', section:'Linux', title:'Linux File Permissions and Ownership', definitionFr:'Les permissions Linux définissent qui peut lire, écrire ou exécuter un fichier.', conceptHt:'Permissions yo kontwole sekirite fichye yo.', whyItMatters:'Misconfigured permissions expose credentials and scripts.', deepExplanation:'Use rwx model, user/group/other, and setuid carefully.', steps:['Inspect permissions with ls -l','Modify with chmod','Set ownership with chown','Audit sensitive directories'], code:`ls -l /var/www
chmod 750 app
chown -R www-data:devops app`, coreConcepts:['rwx model','octal notation','ownership'], commonMistakes:['Using 777 in production'], practicalExercises:['Secure a web directory for app + admin access.'], challengeExercises:['Create a policy for home directories.'], quiz:['What does chmod 640 mean?'], summary:'Permission hygiene is a baseline Linux security control.', relatedTopics:['Bash scripting'], nextLesson:'linux-process-management'}),
  mkLesson({ id:'linux-process-management', section:'Linux', title:'Linux Process and Service Management', definitionFr:'La gestion de processus permet de surveiller, prioriser et contrôler les services système.', conceptHt:'Konnen pwosesis yo ede w rezoud pann rapid.', whyItMatters:'Performance and stability depend on healthy service lifecycle.', deepExplanation:'Use ps/top/htop for inspection and systemctl for service state and logs.', steps:['List processes','Identify high CPU/RAM','Restart failing service','Inspect logs'], code:`ps aux | head
sudo systemctl status nginx
sudo journalctl -u nginx --since "1 hour ago"`, coreConcepts:['PID','foreground/background','systemd units'], commonMistakes:['Restarting without root cause analysis'], practicalExercises:['Troubleshoot a failed service.'], challengeExercises:['Build a runbook for recurring outages.'], quiz:['Which command shows service logs with systemd?'], summary:'Reliable operations come from process visibility and disciplined service handling.', relatedTopics:['Operating systems'], nextLesson:'linux-networking'}),
  mkLesson({ id:'linux-networking', section:'Linux', title:'Linux Networking Essentials', definitionFr:'Les outils réseau Linux aident à diagnostiquer connectivité, DNS et routage.', conceptHt:'Rezo Linux se baz depanaj nan sysadmin ak sekirite.', whyItMatters:'Network outages and misroutes cause major operational incidents.', deepExplanation:'Layered diagnostics move from interface state to DNS and remote reachability.', steps:['Check interface','Validate routes','Test DNS','Trace path'], code:`ip a
ip route
dig api.example.com
traceroute 8.8.8.8`, coreConcepts:['IP addressing','routing table','DNS resolution'], commonMistakes:['Only using ping and stopping there'], practicalExercises:['Diagnose a host that resolves DNS but cannot reach HTTPS.'], challengeExercises:['Document end-to-end troubleshooting flowchart.'], quiz:['What command displays routing table on modern Linux?'], summary:'Structured troubleshooting prevents guesswork.', relatedTopics:['Networking'], nextLesson:'net-osi-model'}),
  mkLesson({ id:'net-osi-model', section:'Networking', title:'OSI Model in Practice', definitionFr:'Le modèle OSI décrit la communication réseau en 7 couches.', conceptHt:'Modèl OSI ede w separe pwoblèm rezo pa kouch.', whyItMatters:'It provides a common troubleshooting language for teams.', deepExplanation:'Most incidents map to physical/link/network/transport/application boundaries.', steps:['Identify symptom','Map likely OSI layer','Run layer-specific checks','Validate fix end-to-end'], code:`# Layer 3 check
ip route get 1.1.1.1
# Layer 7 check
curl -I https://example.com`, coreConcepts:['Layer mapping','protocol boundaries'], commonMistakes:['Jumping to app layer without L3/L4 checks'], practicalExercises:['Classify five incidents by OSI layer.'], challengeExercises:['Build a layered runbook template.'], quiz:['At which OSI layer does TCP operate?'], summary:'OSI thinking improves incident clarity and escalation quality.', relatedTopics:['Linux networking'], nextLesson:'net-subnetting'}),
  mkLesson({ id:'net-subnetting', section:'Networking', title:'IPv4 Subnetting Basics', definitionFr:'Le subnetting découpe un réseau en sous-réseaux pour optimiser routage et sécurité.', conceptHt:'Subnetting ede w òganize IP epi limite trafik initil.', whyItMatters:'Good segmentation improves performance and containment.', deepExplanation:'CIDR notation defines network/host bits and address capacity.', steps:['Read CIDR prefix','Calculate network and broadcast','Determine usable hosts','Assign VLAN/subnet purpose'], code:`# Example: 192.168.10.0/24 split into /26
# Subnets: .0/26 .64/26 .128/26 .192/26`, coreConcepts:['CIDR','network ID','broadcast address'], commonMistakes:['Assigning network/broadcast as host addresses'], practicalExercises:['Plan subnets for HR, IT, SOC, and Guest Wi-Fi.'], challengeExercises:['Design addressing for two offices with growth buffer.'], quiz:['How many usable hosts in a /27 subnet?'], summary:'Subnetting is foundational for scalable network architecture.', relatedTopics:['Cloud basics'], nextLesson:'net-dns'}),
  mkLesson({ id:'net-dns', section:'Networking', title:'DNS Fundamentals and Security', definitionFr:'Le DNS traduit les noms de domaine en adresses IP.', conceptHt:'DNS se anyè entènèt la; si li tonbe, sèvis yo difisil jwenn.', whyItMatters:'DNS abuse enables phishing, C2, and data exfiltration.', deepExplanation:'Understand records (A, AAAA, CNAME, MX, TXT), resolver flow, and defensive logging.', steps:['Query records','Check resolver path','Validate TTL/caching','Review DNS logs'], code:`dig example.com A
dig example.com MX
nslookup example.com`, coreConcepts:['Recursive resolver','authoritative server','record types'], commonMistakes:['No DNS monitoring', 'Misconfigured TTL'], practicalExercises:['Analyze suspicious DNS queries from a host.'], challengeExercises:['Create DNS hardening checklist.'], quiz:['What record type is commonly used for email routing?'], summary:'DNS literacy is critical for operations and threat detection.', relatedTopics:['SOC fundamentals'], nextLesson:'py-basics'}),
  mkLesson({ id:'py-basics', section:'Python', title:'Python Foundations for IT & Security', definitionFr:'Python est un langage polyvalent pour automatisation, analyse et scripts de sécurité.', conceptHt:'Python pèmèt ou otomatik travay repetitif fasil.', whyItMatters:'Automation scales analyst and admin productivity.', deepExplanation:'Start with variables, control flow, functions, and file I/O.', steps:['Install Python','Create virtual env','Write first script','Run and test'], code:`python3 -m venv .venv
source .venv/bin/activate
python --version`, coreConcepts:['Data types','functions','modules'], commonMistakes:['Running scripts without virtual environments'], practicalExercises:['Write script to parse log lines by severity.'], challengeExercises:['Build CLI tool to check service health endpoints.'], quiz:['What command creates a virtual environment?'], summary:'Python is a force multiplier across all technical domains.', relatedTopics:['Data analysis'], nextLesson:'py-automation'}),
  mkLesson({ id:'py-automation', section:'Python', title:'Automating Tasks with Python', definitionFr:'L’automatisation Python réduit les erreurs humaines et accélère les opérations.', conceptHt:'Otomatizasyon fè travay yo pi vit ak pi regilye.', whyItMatters:'Repeatable automation increases reliability and auditability.', deepExplanation:'Use argparse, pathlib, csv/json parsing, and robust logging.', steps:['Define input/output','Implement idempotent logic','Add logging','Schedule execution'], code:`import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--host', required=True)
args = parser.parse_args()
print(f'Checking {args.host}')`, coreConcepts:['Idempotency','CLI arguments','logging'], commonMistakes:['Hardcoding secrets in scripts'], practicalExercises:['Automate user report generation from CSV.'], challengeExercises:['Create backup script with retention policy.'], quiz:['Why is idempotency important in automation?'], summary:'Good automation is observable, testable, and secure.', relatedTopics:['Bash scripting'], nextLesson:'py-data'}),
  mkLesson({ id:'py-data', section:'Python', title:'Python for Data Analysis Basics', definitionFr:'L’analyse de données en Python permet de transformer des données brutes en décisions.', conceptHt:'Ou ka itilize Python pou konprann tandans nan done yo.', whyItMatters:'Security and IT teams rely on data for detection and planning.', deepExplanation:'Core workflow: ingest, clean, transform, visualize, interpret.', steps:['Load CSV','Clean null values','Aggregate metrics','Export report'], code:`import csv
with open('events.csv') as f:
    rows = list(csv.DictReader(f))
print(len(rows))`, coreConcepts:['Data cleaning','aggregation','reporting'], commonMistakes:['Ignoring data quality before analysis'], practicalExercises:['Compute top 5 source IPs from sample logs.'], challengeExercises:['Build weekly KPI report script.'], quiz:['What is the first step before visualization?'], summary:'Data literacy improves tactical and strategic decisions.', relatedTopics:['SQL'], nextLesson:'sql-select'}),
  mkLesson({ id:'sql-select', section:'SQL', title:'SQL SELECT and Filtering', definitionFr:'SQL permet d’interroger des bases de données relationnelles.', conceptHt:'SQL ede w jwenn enfòmasyon presi nan baz done.', whyItMatters:'Analysts need precise queries to investigate events quickly.', deepExplanation:'Master SELECT, WHERE, ORDER BY, LIMIT, and aliases.', steps:['Select columns','Filter rows','Sort output','Limit results'], code:`SELECT username, last_login
FROM users
WHERE is_active = 1
ORDER BY last_login DESC
LIMIT 10;`, coreConcepts:['Projection','filtering','sorting'], commonMistakes:['Using SELECT * in production dashboards'], practicalExercises:['List failed logins from last 24 hours.'], challengeExercises:['Create filtered query for privileged users inactive > 90 days.'], quiz:['What clause is used to filter rows?'], summary:'Query basics are essential for any data-driven role.', relatedTopics:['Databases'], nextLesson:'sql-joins'}),
  mkLesson({ id:'sql-joins', section:'SQL', title:'Understanding SQL JOINs', definitionFr:'Les jointures combinent des données de plusieurs tables selon des clés communes.', conceptHt:'JOIN pèmèt ou melanje done nan plizyè tab.', whyItMatters:'Real-world analysis almost always needs multi-table context.', deepExplanation:'Use INNER for matching rows, LEFT for preserving primary table, and understand cardinality.', steps:['Inspect schema','Identify join keys','Choose join type','Validate duplicates/nulls'], code:`SELECT u.username, r.role_name
FROM users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
LEFT JOIN roles r ON r.id = ur.role_id;`, coreConcepts:['Primary/foreign keys','join cardinality'], commonMistakes:['Joining on non-unique keys without validation'], practicalExercises:['Join alerts with asset owners.'], challengeExercises:['Build query to find users without assigned roles.'], quiz:['When would LEFT JOIN be better than INNER JOIN?'], summary:'Join design quality determines analysis reliability.', relatedTopics:['Data analysis'], nextLesson:'sql-indexes'}),
  mkLesson({ id:'sql-indexes', section:'SQL', title:'SQL Indexing and Query Performance', definitionFr:'Les index accélèrent les requêtes en réduisant le volume de données parcourues.', conceptHt:'Index fè rechèch done pi rapid.', whyItMatters:'Slow queries impact monitoring, reporting, and user experience.', deepExplanation:'Use indexes on frequently filtered/joined columns but balance write overhead.', steps:['Find slow query','Review execution plan','Add index','Measure improvement'], code:`CREATE INDEX idx_events_created_at ON events(created_at);
EXPLAIN ANALYZE SELECT * FROM events WHERE created_at > NOW() - INTERVAL '1 day';`, coreConcepts:['Execution plan','selectivity','write cost'], commonMistakes:['Over-indexing every column'], practicalExercises:['Optimize query filtering by email and status.'], challengeExercises:['Design indexing strategy for login_events table.'], quiz:['What tradeoff comes with additional indexes?'], summary:'Performance tuning is continuous and evidence-driven.', relatedTopics:['Databases'], nextLesson:'roadmap-soc'}),
];

export const sections = [
  'Cybersecurity','Linux','Networking','Python','SQL','HTML','CSS','JavaScript','Git and GitHub','Operating Systems','Databases','Data Analysis','Cloud basics','Bash / scripting','Web security','Cryptography basics','Blue Team basics','Red Team basics','SOC fundamentals','Digital forensics basics','Programming foundations','Computer science foundations','Career roadmaps','Labs and exercises','Projects and practice scenarios'
];
